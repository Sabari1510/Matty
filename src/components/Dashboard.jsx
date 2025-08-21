import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'Designer', email: 'designer@example.com' });
  const [stats, setStats] = useState({ 
    totalDesigns: 0, 
    thisMonth: 0, 
    shared: 0, 
    favorites: 0,
    storageUsed: 0,
    storageLimit: 100
  });
  const [recentDesigns, setRecentDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setRecentDesigns([
          { 
            id: 1, 
            name: 'Modern Logo Design', 
            lastModified: '2 hours ago', 
            type: 'logo',
            thumbnail: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Logo',
            size: '2.4 MB'
          },
          { 
            id: 2, 
            name: 'Social Media Banner', 
            lastModified: '1 day ago', 
            type: 'banner',
            thumbnail: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=Banner',
            size: '1.8 MB'
          },
          { 
            id: 3, 
            name: 'Business Card Template', 
            lastModified: '3 days ago', 
            type: 'card',
            thumbnail: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=Card',
            size: '3.2 MB'
          },
          { 
            id: 4, 
            name: 'Website Hero Section', 
            lastModified: '1 week ago', 
            type: 'web',
            thumbnail: 'https://via.placeholder.com/300x200/4facfe/ffffff?text=Hero',
            size: '4.1 MB'
          },
          { 
            id: 5, 
            name: 'Product Mockup', 
            lastModified: '2 weeks ago', 
            type: 'mockup',
            thumbnail: 'https://via.placeholder.com/300x200/43e97b/ffffff?text=Mockup',
            size: '5.6 MB'
          },
          { 
            id: 6, 
            name: 'Instagram Post', 
            lastModified: '3 weeks ago', 
            type: 'social',
            thumbnail: 'https://via.placeholder.com/300x200/fa709a/ffffff?text=Post',
            size: '2.1 MB'
          }
        ]);

        setStats({
          totalDesigns: 42,
          thisMonth: 12,
          shared: 8,
          favorites: 15,
          storageUsed: 67,
          storageLimit: 100
        });

        // Get user data from localStorage or API
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleCreateNew = () => {
    navigate('/editor');
  };

  const handleDesignClick = (designId) => {
    navigate(`/editor?design=${designId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const getStoragePercentage = () => {
    return (stats.storageUsed / stats.storageLimit) * 100;
  };

  const getStorageColor = () => {
    const percentage = getStoragePercentage();
    if (percentage > 80) return 'storage-red';
    if (percentage > 60) return 'storage-yellow';
    return 'storage-green';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Animated Background */}
      <div className="dashboard-background">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo-container">
              <span className="logo-text">M</span>
            </div>
            <span className="brand-text">Matty</span>
          </div>
          
          <div className="header-right">
            <button 
              onClick={handleCreateNew}
              className="btn-create"
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create New</span>
            </button>
            
            <div className="user-section">
              <div className="user-avatar">
                <span className="avatar-text">
                  {user?.name?.charAt(0) || 'U'}
                </span>
                <div className="online-indicator"></div>
              </div>
              
              <div className="user-info">
                <p className="user-name">{user?.name}</p>
                <p className="user-email">{user?.email}</p>
              </div>
              
              <button 
                onClick={handleLogout}
                className="btn-logout"
              >
                <svg className="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome back, <span className="welcome-highlight">{user?.name || 'Designer'}!</span>
          </h1>
          <p className="welcome-subtitle">
            Ready to create something amazing today? You have {stats.thisMonth} new designs this month.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Total Designs</p>
                <p className="stat-value">{stats.totalDesigns}</p>
                <p className="stat-growth">+12% this month</p>
              </div>
              <div className="stat-icon stat-icon-blue">
                <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">This Month</p>
                <p className="stat-value">{stats.thisMonth}</p>
                <p className="stat-growth">Active projects</p>
              </div>
              <div className="stat-icon stat-icon-purple">
                <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Shared</p>
                <p className="stat-value">{stats.shared}</p>
                <p className="stat-growth">+3 this week</p>
              </div>
              <div className="stat-icon stat-icon-green">
                <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.316C18.114 15.938 18 15.482 18 15c0-.482.114-.938.316-1.342m0 2.684a3 3 0 110-2.684M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Storage</p>
                <p className="stat-value">{stats.storageUsed}GB</p>
                <p className="stat-growth">of {stats.storageLimit}GB</p>
              </div>
              <div className="stat-icon stat-icon-pink">
                <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
            <div className="storage-bar">
              <div className={`storage-progress ${getStorageColor()}`} style={{ width: `${getStoragePercentage()}%` }}></div>
            </div>
          </div>
        </div>

        {/* Recent Designs */}
        <div className="designs-section">
          <div className="section-header">
            <h2 className="section-title">Recent Designs</h2>
            <button 
              onClick={handleCreateNew}
              className="btn-create-secondary"
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create New</span>
            </button>
          </div>

          <div className="designs-grid">
            {recentDesigns.map((design) => (
              <div 
                key={design.id}
                className="design-card"
                onClick={() => handleDesignClick(design.id)}
              >
                <div className="design-thumbnail">
                  <img 
                    src={design.thumbnail} 
                    alt={design.name}
                    className="thumbnail-image"
                  />
                  <div className="thumbnail-overlay">
                    <div className="overlay-content">
                      <svg className="overlay-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="design-content">
                  <h3 className="design-title">{design.name}</h3>
                  <div className="design-meta">
                    <p className="design-date">{design.lastModified}</p>
                    <p className="design-size">{design.size}</p>
                  </div>
                  <div className="design-footer">
                    <span className="design-type">{design.type}</span>
                    <div className="design-actions">
                      <button className="action-btn">
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.316C18.114 15.938 18 15.482 18 15c0-.482.114-.938.316-1.342m0 2.684a3 3 0 110-2.684M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button className="action-btn">
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Resources */}
        <div className="actions-grid">
          <div className="action-card">
            <h3 className="action-title">
              <svg className="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Start
            </h3>
            <div className="action-buttons">
              <button 
                onClick={handleCreateNew}
                className="action-button"
              >
                <div className="button-content">
                  <div className="button-icon button-icon-blue">
                    <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="button-text">
                    <p className="button-title">Start from Scratch</p>
                    <p className="button-subtitle">Create a new design</p>
                  </div>
                </div>
              </button>
              
              <button className="action-button">
                <div className="button-content">
                  <div className="button-icon button-icon-purple">
                    <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="button-text">
                    <p className="button-title">Browse Templates</p>
                    <p className="button-subtitle">Choose from 1000+ templates</p>
                  </div>
                </div>
              </button>
              
              <button className="action-button">
                <div className="button-content">
                  <div className="button-icon button-icon-green">
                    <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="button-text">
                    <p className="button-title">Import Design</p>
                    <p className="button-subtitle">Upload existing files</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="action-card">
            <h3 className="action-title">
              <svg className="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Learning Center
            </h3>
            <div className="learning-links">
              <a href="#" className="learning-link">
                <div className="link-content">
                  <div className="link-icon link-icon-blue">
                    <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="link-text">
                    <p className="link-title">Getting Started Guide</p>
                    <p className="link-subtitle">Learn the basics in 5 minutes</p>
                  </div>
                </div>
              </a>
              
              <a href="#" className="learning-link">
                <div className="link-content">
                  <div className="link-icon link-icon-purple">
                    <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="link-text">
                    <p className="link-title">Video Tutorials</p>
                    <p className="link-subtitle">Step-by-step design tutorials</p>
                  </div>
                </div>
              </a>
              
              <a href="#" className="learning-link">
                <div className="link-content">
                  <div className="link-icon link-icon-green">
                    <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="link-text">
                    <p className="link-title">Design Tips & Tricks</p>
                    <p className="link-subtitle">Pro tips for better designs</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="action-card">
            <h3 className="action-title">
              <svg className="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
              </svg>
              AI Suggestions
            </h3>
            <div className="ai-suggestions">
              <div className="suggestion-card suggestion-blue">
                <p className="suggestion-title">🎨 Design Trend Alert</p>
                <p className="suggestion-text">Glassmorphism is trending! Try creating designs with frosted glass effects.</p>
                <button className="suggestion-btn">Learn More →</button>
              </div>
              
              <div className="suggestion-card suggestion-green">
                <p className="suggestion-title">⚡ Quick Tip</p>
                <p className="suggestion-text">Use the AI color palette generator for perfect color combinations.</p>
                <button className="suggestion-btn">Try Now →</button>
              </div>
              
              <div className="suggestion-card suggestion-purple">
                <p className="suggestion-title">📈 Performance</p>
                <p className="suggestion-text">You're in the top 10% of designers this month! Keep it up!</p>
                <button className="suggestion-btn">View Stats →</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

