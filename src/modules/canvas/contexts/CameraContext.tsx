import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { OrbitControls } from '../libs/OrbitControls/OrbitControls';
import { useFrame, useThree } from 'react-three-fiber';

export const CameraControlContext = React.createContext<[OrbitControls, Dispatch<SetStateAction<OrbitControls>>]>(null);

export const CameraControlContextProvider: React.FC = ({ children }) => {
  const [orbitControls, setOrbitControl] = useState<OrbitControls>(null);

  return (
    <CameraControlContext.Provider value={[orbitControls, setOrbitControl]}>{children}</CameraControlContext.Provider>
  );
};
