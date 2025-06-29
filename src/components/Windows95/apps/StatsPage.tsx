import React, { useState, useEffect, memo } from 'react';
import { posthog } from '../../../lib/posthog';

/**
 * StatsPage props interface
 */
interface StatsPageProps {
  onContinue: () => void;
}

/**
 * StatsPage component displays statistics and provides a transition
 * to the modern site, styled like Windows 95 but with modern content
 */
const StatsPage: React.FC<StatsPageProps> = ({ onContinue }) => {
  const [progress, setProgress] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showInstallation, setShowInstallation] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installStep, setInstallStep] = useState('');

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate progress bar
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 2, 100));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Simulate session duration counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate click counter
  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => prev + 1);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Track when user clicks continue
  const handleContinue = () => {
    posthog.capture('stats_page_continue_clicked', {
      session_duration: sessionDuration,
      click_count: clickCount
    });
    setShowUpgradeModal(true);
  };

  // Handle upgrade modal continue
  const handleUpgradeContinue = () => {
    setShowUpgradeModal(false);
    setShowInstallation(true);
    startInstallation();
  };

  // Simulate installation process
  const startInstallation = () => {
    const steps = [
      { progress: 10, step: 'Initializing upgrade...' },
      { progress: 25, step: 'Downloading modern components...' },
      { progress: 40, step: 'Installing responsive design...' },
      { progress: 55, step: 'Configuring AI features...' },
      { progress: 70, step: 'Optimizing performance...' },
      { progress: 85, step: 'Finalizing installation...' },
      { progress: 100, step: 'Upgrade complete!' }
    ];

    let currentStep = 0;
    const installInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setInstallProgress(steps[currentStep].progress);
        setInstallStep(steps[currentStep].step);
        currentStep++;
      } else {
        clearInterval(installInterval);
        setTimeout(() => {
          onContinue();
        }, 2000);
      }
    }, 800);
  };

  // Installation modal
  if (showInstallation) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          border: '2px solid #000080'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#000080',
            marginBottom: '20px'
          }}>
            🚀 Upgrading to Modern Site
          </div>
          
          <div style={{
            marginBottom: '20px',
            fontSize: '16px',
            color: '#333'
          }}>
            {installStep}
          </div>
          
          <div style={{
            width: '100%',
            height: '20px',
            background: '#e0e0e0',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            <div style={{
              width: `${installProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #000080, #008CFF)',
              transition: 'width 0.3s ease'
            }} />
          </div>
          
          <div style={{
            fontSize: '14px',
            color: '#666'
          }}>
            {installProgress}% Complete
          </div>
        </div>
      </div>
    );
  }

  // Upgrade modal
  if (showUpgradeModal) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '2px solid #000080'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#000080',
              marginBottom: '10px'
            }}>
              🎯 Why Upgrade Matters
            </div>
            <div style={{
              fontSize: '18px',
              color: '#666'
            }}>
              Your engagement shows you're ready for the next level
            </div>
          </div>

          {/* Statistics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* Time Spent Stats */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '24px',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                {sessionDuration}s
              </div>
              <div style={{
                fontSize: '16px',
                marginBottom: '12px'
              }}>
                Time Spent
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>
                Users who spend 2+ minutes are 3x more likely to convert
              </div>
            </div>

            {/* Click Stats */}
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              padding: '24px',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                {clickCount}
              </div>
              <div style={{
                fontSize: '16px',
                marginBottom: '12px'
              }}>
                Interactions
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>
                Each click increases conversion probability by 15%
              </div>
            </div>

            {/* Industry Stats */}
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              padding: '24px',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                68%
              </div>
              <div style={{
                fontSize: '16px',
                marginBottom: '12px'
              }}>
                Higher Conversion
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>
                Modern sites convert 68% better than outdated designs
              </div>
            </div>

            {/* Revenue Impact */}
            <div style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              padding: '24px',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                $2.4M
              </div>
              <div style={{
                fontSize: '16px',
                marginBottom: '12px'
              }}>
                Average Revenue
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9
              }}>
                Companies with modern sites see 73% revenue increase
              </div>
            </div>
          </div>

          {/* Research-backed insights */}
          <div style={{
            background: '#f8f9fa',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '30px'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#000080',
              marginBottom: '16px'
            }}>
              📊 Research-Backed Insights
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Time on Site Impact
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  • 2+ minutes: 3x higher conversion rate<br/>
                  • 5+ minutes: 7x higher conversion rate<br/>
                  • 10+ minutes: 12x higher conversion rate
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  User Engagement Metrics
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  • Each click: +15% conversion probability<br/>
                  • Page scrolls: +25% engagement score<br/>
                  • Form interactions: +40% lead quality
                </div>
              </div>
            </div>
          </div>

          {/* Modern Benefits */}
          <div style={{
            marginBottom: '30px'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#000080',
              marginBottom: '16px'
            }}>
              🚀 What You'll Get with Modern Design
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                padding: '16px',
                background: '#e3f2fd',
                borderRadius: '8px',
                border: '1px solid #2196f3'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#1976d2',
                  marginBottom: '8px'
                }}>
                  📱 Responsive Design
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Works perfectly on all devices
                </div>
              </div>
              <div style={{
                padding: '16px',
                background: '#f3e5f5',
                borderRadius: '8px',
                border: '1px solid #9c27b0'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#7b1fa2',
                  marginBottom: '8px'
                }}>
                  🤖 AI-Powered
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Smart features for better engagement
                </div>
              </div>
              <div style={{
                padding: '16px',
                background: '#e8f5e8',
                borderRadius: '8px',
                border: '1px solid #4caf50'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#388e3c',
                  marginBottom: '8px'
                }}>
                  ⚡ Performance
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Faster loading and smoother experience
                </div>
              </div>
              <div style={{
                padding: '16px',
                background: '#fff3e0',
                borderRadius: '8px',
                border: '1px solid #ff9800'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#f57c00',
                  marginBottom: '8px'
                }}>
                  📈 Analytics
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Detailed insights and optimization
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setShowUpgradeModal(false)}
              style={{
                padding: '12px 24px',
                border: '2px solid #ccc',
                background: '#f0f0f0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Maybe Later
            </button>
            <button
              onClick={handleUpgradeContinue}
              style={{
                padding: '12px 32px',
                border: 'none',
                background: 'linear-gradient(135deg, #000080, #008CFF)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                boxShadow: '0 4px 12px rgba(0, 140, 255, 0.3)'
              }}
            >
              🚀 Start Upgrade Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="win95-stats-page">
      <div className="win95-stats-header">
        <img src="/update.png" alt="Update" className="win95-stats-logo" />
        <h2 className="win95-stats-title">Website Update</h2>
      </div>

      {isLoading ? (
        <div className="win95-stats-loading">
          <div className="win95-stats-loading-text">Loading statistics...</div>
          <div className="win95-stats-progress-container">
            <div 
              className="win95-stats-progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="win95-stats-loading-percent">{progress}%</div>
        </div>
      ) : (
        <>
          {/* Client Metrics */}
          <div className="win95-stats-metrics">
            <div className="win95-stats-metric">
              <div className="win95-stats-metric-icon" style={{ backgroundColor: '#000080' }}>
                <span>⏱️</span>
              </div>
              <div className="win95-stats-metric-content">
                <div className="win95-stats-metric-value">{sessionDuration}s</div>
                <div className="win95-stats-metric-label">Session Duration</div>
              </div>
            </div>
            
            <div className="win95-stats-metric">
              <div className="win95-stats-metric-icon" style={{ backgroundColor: '#008000' }}>
                <span>👆</span>
              </div>
              <div className="win95-stats-metric-content">
                <div className="win95-stats-metric-value">{clickCount}</div>
                <div className="win95-stats-metric-label">Interactions</div>
              </div>
            </div>
            
            <div className="win95-stats-metric">
              <div className="win95-stats-metric-icon" style={{ backgroundColor: '#800080' }}>
                <span>🔄</span>
              </div>
              <div className="win95-stats-metric-content">
                <div className="win95-stats-metric-value">94%</div>
                <div className="win95-stats-metric-label">First Impressions</div>
              </div>
            </div>
            
            <div className="win95-stats-metric">
              <div className="win95-stats-metric-icon" style={{ backgroundColor: '#800000' }}>
                <span>⚡</span>
              </div>
              <div className="win95-stats-metric-content">
                <div className="win95-stats-metric-value">73%</div>
                <div className="win95-stats-metric-label">Revenue Increase</div>
              </div>
            </div>
          </div>
          
          <div className="win95-stats-info">
            <h3>Ready to upgrade to 2025?</h3>
            <p>Your Windows 95 experience has been great, but modern technology offers:</p>
            <ul>
              <li>Responsive designs that work on all devices</li>
              <li>AI-powered tools for better customer engagement</li>
              <li>Faster loading times and smoother animations</li>
              <li>Enhanced security and reliability</li>
            </ul>
            
            <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #000080', background: '#e0f0ff' }}>
              <h4 style={{ color: '#000080', marginTop: 0 }}>Did you know?</h4>
              <ul style={{ marginBottom: 0 }}>
                <li>Websites with modern designs convert 68% better than outdated ones</li>
                <li>Each additional second of page load time reduces conversions by 7%</li>
                <li>Interactive elements increase user engagement by 200-300%</li>
                <li>AI-powered features can boost customer satisfaction by 35%</li>
              </ul>
            </div>
          </div>
          
          <div className="win95-stats-actions">
            <button 
              className="win95-button win95-stats-continue"
              onClick={handleContinue}
            >
              Continue to Modern Site
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .win95-stats-page {
          padding: 10px;
          height: 100%;
          overflow-y: auto;
          background: var(--win95-window-bg);
          display: flex;
          flex-direction: column;
        }
        
        .win95-stats-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          padding: 5px;
          border: 1px solid var(--win95-border-inner-dark);
          background: white;
        }
        
        .win95-stats-logo {
          width: 32px;
          height: 32px;
        }
        
        .win95-stats-title {
          font-size: 14px;
          font-weight: bold;
          margin: 0;
        }
        
        .win95-stats-loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        
        .win95-stats-loading-text {
          margin-bottom: 10px;
        }
        
        .win95-stats-progress-container {
          width: 80%;
          height: 20px;
          border: 2px solid;
          border-color: var(--win95-border-outer-dark) var(--win95-border-outer-light) var(--win95-border-outer-light) var(--win95-border-outer-dark);
          background: white;
          margin-bottom: 5px;
        }
        
        .win95-stats-progress-bar {
          height: 100%;
          background-color: #000080;
          transition: width 0.3s;
        }
        
        .win95-stats-loading-percent {
          font-size: 12px;
        }
        
        .win95-stats-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .win95-stats-metric {
          border: 2px solid;
          border-color: var(--win95-border-outer-light) var(--win95-border-outer-dark) var(--win95-border-outer-dark) var(--win95-border-outer-light);
          background: white;
          padding: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .win95-stats-metric-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
        }
        
        .win95-stats-metric-content {
          flex: 1;
        }
        
        .win95-stats-metric-value {
          font-size: 16px;
          font-weight: bold;
        }
        
        .win95-stats-metric-label {
          font-size: 12px;
        }
        
        .win95-stats-info {
          border: 2px solid;
          border-color: var(--win95-border-outer-light) var(--win95-border-outer-dark) var(--win95-border-outer-dark) var(--win95-border-outer-light);
          background: white;
          padding: 10px;
          margin-bottom: 15px;
        }
        
        .win95-stats-info h3 {
          font-size: 14px;
          margin-top: 0;
          margin-bottom: 10px;
        }
        
        .win95-stats-info p {
          font-size: 12px;
          margin-bottom: 10px;
        }
        
        .win95-stats-info ul {
          font-size: 12px;
          margin: 0;
          padding-left: 20px;
        }
        
        .win95-stats-actions {
          display: flex;
          justify-content: center;
          margin-top: auto;
          padding-top: 15px;
        }
        
        .win95-stats-continue {
          padding: 8px 16px;
          font-weight: bold;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .win95-stats-metrics {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(StatsPage);