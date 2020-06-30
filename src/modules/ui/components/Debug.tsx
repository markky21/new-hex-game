import React from 'react';
import { useObservable } from 'react-use';

import { uiQuery } from '../../../store/ui/ui.query';
import { uiService } from '../../../store/ui/ui.service';
import { uiStore } from '../../../store/ui/ui.store';

export const Debug: React.FC = React.memo(() => {
  const showTokensPanel = useObservable(uiQuery.debug_showTokensPanel$, uiStore.getValue().debug_showTokensPanel);
  const setShowTokensPanel = (checked: boolean) => uiService.updateDebugShowTokensPanel(checked);

  return (
    <div>
      <input
        id="showTokensPanel"
        type="checkbox"
        checked={showTokensPanel}
        onChange={(e) => setShowTokensPanel(e.target.checked)}
        name="showTokensPanel"
      />
      <label htmlFor="showTokensPanel">showTokensPanel</label>
    </div>
  );
});
