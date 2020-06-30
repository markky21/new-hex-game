import React, { useMemo } from 'react';
import {
  DoubleSide,
  Font,
  MeshBasicMaterial,
  MeshBasicMaterialParameters,
  TextGeometry,
  TextGeometryParameters,
  Vector3,
} from 'three';

const fontJson = require('three/examples/fonts/helvetiker_regular.typeface.json');
const font = new Font(fontJson);

const textGeometryDefault: TextGeometryParameters = {
  font: font,
  size: 0.2,
  height: 0,
  curveSegments: 12,
  bevelEnabled: false,
};

const textMaterialDefault: MeshBasicMaterialParameters = {
  side: DoubleSide,
};

interface TextProps {
  label: string;
  position?: Vector3 | [number, number, number];
  geometryConfig?: Partial<TextGeometryParameters>;
  materialConfig?: Partial<MeshBasicMaterialParameters>;
}

export const Text: React.FC<TextProps> = ({ label, position, geometryConfig, materialConfig }) => {
  const geometry = useMemo(() => {
    const textGeometryConfig: TextGeometryParameters = {
      ...textGeometryDefault,
      ...(geometryConfig || {}),
    };
    return new TextGeometry(label, textGeometryConfig).center();
  }, [label, geometryConfig]);

  const material = useMemo(() => {
    const textMaterialConfig: MeshBasicMaterialParameters = {
      ...textMaterialDefault,
      color: 'white',
      ...(materialConfig || {}),
    };

    return new MeshBasicMaterial(textMaterialConfig);
  }, [materialConfig]);

  return <mesh position={position} args={[geometry, material]} />;
};
