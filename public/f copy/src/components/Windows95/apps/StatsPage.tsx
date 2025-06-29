import React, { useEffect, useState } from 'react';
import { getSessionDurationFormatted, getClickCount } from '../../../utils/analytics';

interface StatsPageProps {
  onContinue: () => void;
}

// Quotes/statistics about engagement and conversion
const QUOTES = [
  {
    text: '“Users who engage with your site for longer are far more likely to convert. High engagement rates can boost conversion by up to 50%.”',
    source: '— AgencyAnalytics, 2024',
  },
  {
    text: '“A good average session duration is 2-3 minutes. Sites that keep users engaged longer see higher sales and loyalty.”',
    source: '— NudgeNow, 2024',
  },
  {
    text: '“Every extra click is an opportunity: more clicks mean more engagement, and more engagement means more conversions.”',
    source: '— Moz Blog, 2024',
  },
  {
    text: '“Engaged sessions are directly linked to higher ROI for your website. The more users interact, the more likely they are to take action.”',
    source: '— AgencyAnalytics, 2024',
  },
  {
    text: '“Improving user engagement time can lead to reduced bounce rates and more user-friendly websites.”',
    source: '— NudgeNow, 2024',
  },
  {
    text: '“Websites with higher engagement rates (60%+) consistently outperform those with low engagement in both sales and customer satisfaction.”',
    source: '— CT.gov Content Style Guide, 2024',
  },
];

const StatsPage: React.FC<StatsPageProps> = ({ onContinue }) => {
  const [duration, setDuration] = useState<string>(getSessionDurationFormatted());
  const [clicks, setClicks] = useState<number>(getClickCount());
  const [quoteIdx, setQuoteIdx] = useState<number>(0);

  // Update session duration every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(getSessionDurationFormatted());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Poll click count every 500ms
  useEffect(() => {
    const poll = setInterval(() => setClicks(getClickCount()), 500);
    return () => clearInterval(poll);
  }, []);

  // Rotate quotes every 6 seconds
  useEffect(() => {
    const rotator = setInterval(() => {
      setQuoteIdx((idx) => (idx + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(rotator);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      color: '#1a2233',
      fontFamily: 'system-ui, sans-serif',
      padding: 0,
      position: 'relative',
    }}>
      <div style={{
        width: 600,
        maxWidth: '90vw',
        margin: '0 auto',
        background: 'white',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(60,80,180,0.10)',
        border: '2px solid #b3c6ff',
        padding: '48px 40px 40px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1 style={{ fontSize: 38, fontWeight: 900, marginBottom: 10, letterSpacing: '-1.5px', color: '#2a2a55', textAlign: 'center' }}>
          Engagement = Conversions
        </h1>
        <p style={{ maxWidth: 520, textAlign: 'center', fontSize: 20, marginBottom: 32, color: '#2a2a55', lineHeight: 1.6 }}>
          The longer people stay on your site and the more they interact, the more likely they are to become customers. <b>Session time</b> and <b>clicks</b> are proven drivers of higher conversion rates and business growth.
        </p>
        <div style={{
          width: '100%',
          background: 'linear-gradient(90deg, #e0e7ff 0%, #f0f4ff 100%)',
          border: '2px solid #b3c6ff',
          borderRadius: 16,
          padding: '32px 36px',
          marginBottom: 36,
          minHeight: 110,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'background 0.3s',
        }}>
          <div style={{ fontSize: 24, fontStyle: 'italic', marginBottom: 10, textAlign: 'center', color: '#2a2a55', minHeight: 60 }}>
            {QUOTES[quoteIdx].text}
          </div>
          <div style={{ fontSize: 16, color: '#3b4a6b', textAlign: 'center', fontWeight: 500 }}>{QUOTES[quoteIdx].source}</div>
        </div>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 32,
          margin: '32px 0',
        }}>
          <div style={{
            flex: 1,
            background: 'linear-gradient(90deg, #e6f7e6 0%, #f0fff0 100%)',
            border: '2px solid #b2e6b2',
            borderRadius: 12,
            padding: '28px 0',
            minWidth: 180,
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            color: '#1a4d1a',
            fontWeight: 700,
            fontSize: 28,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ fontSize: 18, color: '#2a2a55', fontWeight: 500, marginBottom: 8 }}>Session Time</div>
            <div>{duration}</div>
          </div>
          <div style={{
            flex: 1,
            background: 'linear-gradient(90deg, #fffbe6 0%, #fffde0 100%)',
            border: '2px solid #ffe6b2',
            borderRadius: 12,
            padding: '28px 0',
            minWidth: 180,
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            color: '#7a4d1a',
            fontWeight: 700,
            fontSize: 28,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ fontSize: 18, color: '#2a2a55', fontWeight: 500, marginBottom: 8 }}>Total Clicks</div>
            <div>{clicks}</div>
          </div>
        </div>
        <button 
          className="win95-button"
          onClick={onContinue}
          style={{ marginTop: '24px', fontSize: 20, padding: '14px 40px', borderRadius: 10, fontWeight: 700, background: '#e0e7ff', color: '#2a2a55', border: '2px solid #b3c6ff', boxShadow: '0 2px 8px rgba(60,80,180,0.08)' }}
        >
          Continue to Modern Site
        </button>
      </div>
    </div>
  );
};

export default StatsPage; 