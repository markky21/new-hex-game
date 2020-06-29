import { useContext, useEffect } from 'react';

import { OrbitControls } from '../../../../libs/OrbitControls/OrbitControls';
import { CameraControlContext } from '../../../../contexts/CameraContext';

export function useSetControlToContext(controls: OrbitControls) {
  const [, setOrbitControl] = useContext(CameraControlContext);

  useEffect(() => {
    if (!controls) return;
    setOrbitControl(controls);
  }, [controls, setOrbitControl]);
}
