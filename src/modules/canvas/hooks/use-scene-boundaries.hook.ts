import React, { useEffect, useState } from 'react';
import { Box3, Object3D } from 'three';

export const useSceneBoundariesHook = (sceneGroup: React.MutableRefObject<Object3D>): Box3 => {
  const [sceneBoundaries, setSceneBoundaries] = useState<Box3>(null);

  useEffect(() => {
    if (!sceneGroup.current) return;
    const boundaries = new Box3();
    boundaries.setFromObject(sceneGroup.current);
    setSceneBoundaries(boundaries);
  }, [sceneGroup]);

  return sceneBoundaries;
};
