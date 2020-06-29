import React from 'react';

import { HemisphereLight } from './HemisphereLight';
import { SpotLight } from './SpotLight';

export const Lights: React.FC = React.memo(() => {
  return (
    <group>
      <HemisphereLight />
      <SpotLight />
    </group>
  );
});
