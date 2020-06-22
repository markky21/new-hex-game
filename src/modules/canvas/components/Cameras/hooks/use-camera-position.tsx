import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { OrthographicCamera } from 'three';

import { equal } from '../../../../../utils/object.utils';
import { CameraControlContext } from '../../../contexts/CameraContext';

export type CameraPosition = Pick<OrthographicCamera, 'top' | 'bottom' | 'left' | 'right' | 'zoom' | 'position'>;

function setPosition(
  cameraPosition: CameraPosition,
  setCameraPosition: Dispatch<SetStateAction<CameraPosition>>,
  camera: OrthographicCamera
) {
  const currentPosition = {
    top: camera.top,
    bottom: camera.bottom,
    left: camera.left,
    right: camera.right,
    zoom: camera.zoom,
    position: camera.position,
  };
  if (!equal(cameraPosition, currentPosition)) {
    setCameraPosition(currentPosition);
  }
}

export function useCameraPosition(): CameraPosition {
  const [cameraControl] = useContext(CameraControlContext);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>();

  useEffect(
    () => {
      if (!cameraControl) return;
      console.log(cameraControl);

      setPosition(cameraPosition, setCameraPosition, cameraControl.object);
      cameraControl.addEventListener('change', ({ target }) => {
        const camera: OrthographicCamera = target.object;
        setPosition(cameraPosition, setCameraPosition, camera);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cameraControl]
  );

  return cameraPosition;
}
