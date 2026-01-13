
import * as React from 'react';

const visuallyHiddenStyles: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
};

export const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return <div style={visuallyHiddenStyles}>{children}</div>;
};
