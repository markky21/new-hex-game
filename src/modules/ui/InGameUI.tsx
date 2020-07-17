import React, { CSSProperties, useState } from 'react';
import { Debug } from './components/Debug';
import { ApiService } from '../../services/api.service';

const styles: { [key: string]: CSSProperties } = {
  main: {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 1000000,
    backgroundColor: 'whitesmoke',
    padding: '8px',
  },
};

export const InGameUI: React.FC = () => {
  const [apiService] = useState(ApiService.getInstance());

  return (
        <section style={styles.main}>
        From Server:
        <Debug />
        <button onClick={() => apiService.emitRoundEnd()}>END OF ROUND</button>
          </section>
  );
};
