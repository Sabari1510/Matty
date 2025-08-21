import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  Classes,
  Position,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
} from '@blueprintjs/core';
import {
  Plus,
  Translate,
  InfoSign,
  FolderOpen,
  FloppyDisk,
  Import,
  AlignJustify,
} from '@blueprintjs/icons';
import { downloadFile } from 'polotno/utils/download';
import { svgToJson } from 'polotno/utils/from-svg';
import * as api from '../api';

export const FileMenu = observer(({ store, project }) => {
  const inputRef = React.useRef();

  const [faqOpened, toggleFaq] = React.useState(false);
  return (
    <>
      <Popover
        content={
          <Menu>
            {/* <MenuDivider title={t('toolbar.layering')} /> */}
            <MenuItem
              icon={<Plus />}
              text="Create new design"
              onClick={() => {
                project.createNewDesign();
              }}
            />
            <MenuDivider />
            <MenuItem
              icon={<FolderOpen />}
              text="Open"
              onClick={() => {
                document.querySelector('#load-project').click();
              }}
            />
            <MenuItem
              icon={<Import />}
              text="Import svg (experimental)"
              onClick={() => {
                document.querySelector('#svg-import-input').click();
              }}
            />
            <MenuItem
              icon={<FloppyDisk />}
              text="Save as JSON"
              onClick={() => {
                const json = store.toJSON();

                const url =
                  'data:text/json;base64,' +
                  window.btoa(
                    unescape(encodeURIComponent(JSON.stringify(json)))
                  );

                downloadFile(url, 'polotno.json');
              }}
            />

            {/* New: Save image to Cloudinary */}
            <MenuItem
              icon={<FloppyDisk />}
              text="Save image to Cloudinary"
              onClick={async () => {
                try {
                  const maxWidth = 1080;
                  const pageWidth = store.activePage?.computedWidth || maxWidth;
                  const canvas = store.pages.length
                    ? await store._toCanvas({
                        pixelRatio: maxWidth / pageWidth,
                        pageId: store.activePage?.id,
                        quickMode: true,
                        _skipTimeout: true,
                      })
                    : document.createElement('canvas');
                  const blob = await new Promise((resolve) =>
                    canvas.toBlob(resolve, 'image/jpeg', 0.9)
                  );
                  const url = await api.uploadImageToCloudinary(blob);
                  try {
                    await navigator.clipboard.writeText(url);
                    alert('Uploaded to Cloudinary. URL copied to clipboard.');
                  } catch (e) {
                    alert('Uploaded to Cloudinary: ' + url);
                  }
                } catch (e) {
                  alert('Upload failed: ' + e.message);
                }
              }}
            />

            <MenuDivider />
            <MenuItem text="Language" icon={<Translate />}>
              <MenuItem
                text="English"
                active={project.language.startsWith('en')}
                onClick={() => {
                  project.setLanguage('en');
                }}
              />
              <MenuItem
                text="Portuguese"
                active={project.language.startsWith('pt')}
                onClick={() => {
                  project.setLanguage('pt');
                }}
              />
              <MenuItem
                text="French"
                active={project.language.startsWith('fr')}
                onClick={() => {
                  project.setLanguage('fr');
                }}
              />
              <MenuItem
                text="Russian"
                active={project.language.startsWith('ru')}
                onClick={() => {
                  project.setLanguage('ru');
                }}
              />
              <MenuItem
                text="Indonesian"
                active={project.language.startsWith('id')}
                onClick={() => {
                  project.setLanguage('id');
                }}
              />
            </MenuItem>
            <MenuItem
              text="About"
              icon={<InfoSign />}
              onClick={() => {
                toggleFaq(true);
              }}
            />
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
      >
        <Button minimal icon={<AlignJustify />} />
      </Popover>
      <input
        type="file"
        id="load-project"
        accept=".json,.polotno"
        ref={inputRef}
        style={{ width: '180px', display: 'none' }}
        onChange={(e) => {
          var input = e.target;

          if (!input.files.length) {
            return;
          }

          var reader = new FileReader();
          reader.onloadend = async function () {
            var text = reader.result;
            let json;
            try {
              json = JSON.parse(text);
            } catch (e) {
              alert('Can not load the project.');
            }

            const errors = store.validate(json);
            if (errors.length > 0) {
              alert('Can not load the project. See console for details.');
              console.error(errors);
              return;
            }

            if (json) {
              await project.createNewDesign();
              store.loadJSON(json);
              project.save();
              input.value = '';
            }
          };
          reader.onerror = function () {
            alert('Can not load the project.');
          };
          reader.readAsText(input.files[0]);
        }}
      />
      <input
        type="file"
        id="svg-import-input"
        accept=".svg"
        ref={inputRef}
        style={{ width: '180px', display: 'none' }}
        onChange={(e) => {
          var input = e.target;

          if (!input.files.length) {
            return;
          }

          var reader = new FileReader();
          reader.onloadend = async function () {
            var text = reader.result;
            let json;
            try {
              json = await svgToJson(text);
            } catch (e) {
              alert('Can not load the project.');
            }

            const errors = store.validate(json);
            if (errors.length > 0) {
              alert('Can not load the project. See console for details.');
              console.error(errors);
              return;
            }

            if (json) {
              await project.createNewDesign();
              store.loadJSON(json);
              project.save();
              input.value = '';
            }
          };
          reader.onerror = function () {
            alert('Can not load the project.');
          };
          reader.readAsText(input.files[0]);
        }}
      />
      <Dialog
        icon={<InfoSign />}
        onClose={() => toggleFaq(false)}
        title="About Polotno Studio"
        isOpen={faqOpened}
        style={{
          width: '80%',
          maxWidth: '700px',
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          
        </div>
      </Dialog>
    </>
  );
});
