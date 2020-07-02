import React, { Suspense } from 'react';
import { Vector3 } from 'three';
import { useThree } from 'react-three-fiber';
import { Token } from '../../../shared/Token/Token';
import { useObservable } from 'react-use';
import { uiQuery } from '../../../../../store/ui/ui.query';
import { uiStore } from '../../../../../store/ui/ui.store';
import { animated, useSpring } from '@react-spring/three';
import {gameService} from "../../../../../services/game.service";

const panelHeight = (height) => height * 0.25;

export const TokensPanel: React.FC = React.memo(() => {
  const showTokensPanel = useObservable(uiQuery.debug_showTokensPanel$, uiStore.getValue().debug_showTokensPanel);

  const { size } = useThree();
    const tokenSet$ = gameService.players.get('Desperado').getPlayerTokenSet();
    const tokenSetObs = useObservable(tokenSet$);

  const { panelPosition } = useSpring({
    panelPosition: [0, showTokensPanel ? -size.height / 2 + panelHeight(size.height) / 2 : -size.height, 0],
    config: { mass: 10, tension: 2000, friction: 300, precision: 0.00001 },
  });

    console.log();

  return (
    <animated.group position={panelPosition as any}>
      {/*Panel*/}
      <group>
        <mesh>
          <planeBufferGeometry attach="geometry" args={[size.width * 0.9, panelHeight(size.height)]} />
          <meshBasicMaterial attach="material" color={0xffff00} />
        </mesh>
      </group>

      <group>
        <Suspense fallback={null}>
          <Token hexRadius={size.width * 0.1} position={new Vector3(0, 0, 0.1)} />
        </Suspense>
      </group>
    </animated.group>
  );
});
