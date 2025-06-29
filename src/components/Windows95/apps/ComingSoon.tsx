import React, { memo } from 'react';
import { AppContentProps } from '../../../data/appData.tsx';

/**
 * ComingSoon component displays a placeholder for features that are not yet implemented
 * @param props - Standard AppContentProps
 */
const ComingSoon: React.FC<AppContentProps> = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%', 
      height: '100%', 
      fontSize: '24px', 
      color: '#fff', 
      backgroundColor: '#000' 
    }}>
      Coming Soon!
    </div>
  );
};

export default memo(ComingSoon);