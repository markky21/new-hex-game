import React, { CSSProperties } from 'react';
import { Debug } from './components/Debug';

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

export const UI: React.FC = () => {
  return (
    <section style={styles.main}>
      Hola
      <Debug />
    </section>
  );
};
