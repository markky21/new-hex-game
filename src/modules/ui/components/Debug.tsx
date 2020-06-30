import React, { useState } from 'react';

export const Debug: React.FC = () => {
  const [showTokensPanel, setShowTokensPanel] = useState(true);

  return (
    <div>
      <input
        id="showTokensPanel"
        type="checkbox"
        checked={showTokensPanel}
        onChange={(e) => {
          console.log({ e, showTokensPanel });
          setShowTokensPanel(e.target.checked as any);
        }}
        name="showTokensPanel"
      />
      <label htmlFor="showTokensPanel">showTokensPanel</label>
    </div>
  );
};
