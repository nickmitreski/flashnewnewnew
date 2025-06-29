import React, { useState } from 'react';

/**
 * PricingWindow component displays pricing plans in the Windows 95 interface
 * with styling inspired by the modern site
 */
const PricingWindow: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      title: 'Basic',
      icon: '/WEBSITES.png',
      description: 'Perfect for small businesses looking to establish their digital presence.',
      price: '$999',
      color: '#008CFF',
      features: ['Custom Website Design', 'Mobile Responsive', 'Contact Form', 'Basic SEO Setup', '1 Month Support']
    },
    {
      id: 'pro',
      title: 'Pro',
      icon: '/BRANDING.png',
      description: 'Ideal for growing businesses ready to expand their digital footprint.',
      price: '$2,499',
      color: '#FFCC00',
      features: ['Everything in Basic', 'E-commerce Integration', 'Content Management System', 'Advanced SEO', '3 Months Support', 'Social Media Setup'],
      popular: true
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      icon: '/AI.png',
      description: 'Comprehensive solution for established businesses seeking digital excellence.',
      price: '$4,999',
      color: '#00CC66',
      features: ['Everything in Pro', 'Custom Features', 'API Integration', 'Performance Optimization', '6 Months Support', 'Analytics Setup', 'Training & Documentation']
    }
  ];

  return (
    <div className="win95-pricing" style={{ 
      padding: '16px', 
      height: '100%', 
      overflowY: 'auto',
      background: '#c0c0c0'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
        padding: '16px',
        border: '2px solid',
        borderColor: '#ffffff #808080 #808080 #ffffff',
        background: 'white',
        boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080'
      }}>
        <img src="/flashforward.png" alt="Flash Forward" style={{ width: '40px', height: '40px' }} />
        <div>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            margin: 0,
            color: '#000080'
          }}>
            Pricing Plans
          </h2>
          <p style={{
            fontSize: '12px',
            margin: '4px 0 0 0',
            color: '#666666'
          }}>
            Choose the perfect plan for your business needs
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        padding: '4px'
      }}>
        {plans.map((plan) => (
          <div key={plan.id} style={{
            border: '2px solid',
            borderColor: plan.popular ? '#000080' : '#ffffff #808080 #808080 #ffffff',
            background: 'white',
            boxShadow: plan.popular 
              ? 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080, 0 0 0 2px #000080' 
              : 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={() => setSelectedPlan(plan.id)}
          onMouseDown={(e) => {
            e.currentTarget.style.borderColor = '#808080 #ffffff #ffffff #808080';
            e.currentTarget.style.boxShadow = 'inset 1px 1px 0 #808080, inset -1px -1px 0 #dfdfdf';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.borderColor = plan.popular ? '#000080' : '#ffffff #808080 #808080 #ffffff';
            e.currentTarget.style.boxShadow = plan.popular 
              ? 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080, 0 0 0 2px #000080' 
              : 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = plan.popular ? '#000080' : '#ffffff #808080 #808080 #ffffff';
            e.currentTarget.style.boxShadow = plan.popular 
              ? 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080, 0 0 0 2px #000080' 
              : 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080';
          }}>
            
            {/* Popular Badge */}
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#000080',
                color: 'white',
                padding: '4px 8px',
                fontSize: '10px',
                fontWeight: 'bold',
                borderRadius: '4px',
                zIndex: 1
              }}>
                POPULAR
              </div>
            )}

            {/* Top Accent */}
            <div style={{
              height: '4px',
              background: plan.color,
              width: '100%'
            }} />
            
            {/* Plan Content */}
            <div style={{ padding: '16px' }}>
              {/* Header with Icon and Title */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: `${plan.color}15`,
                  border: `2px solid ${plan.color}`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img 
                    src={plan.icon} 
                    alt={plan.title} 
                    style={{ width: '24px', height: '24px' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    margin: 0,
                    color: '#000080'
                  }}>
                    {plan.title}
                  </h3>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: plan.color,
                    marginTop: '2px'
                  }}>
                    {plan.price}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '12px',
                lineHeight: '1.4',
                margin: '0 0 12px 0',
                color: '#333333'
              }}>
                {plan.description}
              </p>

              {/* Features */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#000080',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Includes:
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {plan.features.slice(0, 3).map((feature, index) => (
                    <div key={index} style={{
                      fontSize: '11px',
                      color: '#333333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <div style={{
                        width: '4px',
                        height: '4px',
                        background: plan.color,
                        borderRadius: '50%',
                        flexShrink: 0
                      }}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <div style={{
                      fontSize: '10px',
                      color: plan.color,
                      fontWeight: 'bold',
                      marginTop: '4px',
                      fontStyle: 'italic'
                    }}>
                      +{plan.features.length - 3} more features
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan(plan.id);
                }}
                style={{
                  background: plan.color,
                  border: '2px solid',
                  borderColor: '#ffffff #808080 #808080 #ffffff',
                  boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080',
                  padding: '8px 16px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: 'white',
                  width: '100%',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.borderColor = '#808080 #ffffff #ffffff #808080';
                  e.currentTarget.style.boxShadow = 'inset 1px 1px 0 #808080, inset -1px -1px 0 #dfdfdf';
                  e.currentTarget.style.padding = '9px 15px 7px 17px';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.borderColor = '#ffffff #808080 #808080 #ffffff';
                  e.currentTarget.style.boxShadow = 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080';
                  e.currentTarget.style.padding = '8px 16px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#ffffff #808080 #808080 #ffffff';
                  e.currentTarget.style.boxShadow = 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080';
                  e.currentTarget.style.padding = '8px 16px';
                }}>
                {selectedPlan === plan.id ? '✓ Selected' : 'Select Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        border: '2px solid',
        borderColor: '#808080 #ffffff #ffffff #808080',
        background: '#c0c0c0',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '12px',
          margin: 0,
          color: '#000000',
          fontWeight: 'bold'
        }}>
          Need a custom solution? Contact us for a personalized quote!
        </p>
      </div>
    </div>
  );
};

export default PricingWindow;