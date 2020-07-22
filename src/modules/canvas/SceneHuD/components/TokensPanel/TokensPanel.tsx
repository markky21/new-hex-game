import React, {Suspense, useCallback, useEffect} from 'react';
import { Vector3 } from 'three';
import { useThree } from 'react-three-fiber';
import { Token } from '../../../shared/Token/Token';
import { useObservable } from 'react-use';
import { uiQuery } from '../../../../../store/ui/ui.query';
import { uiStore } from '../../../../../store/ui/ui.store';
import { animated, useSpring } from '@react-spring/three';
import { gameQuery } from '../../../../../store/game/game.query';

const panelHeight = (height) => height * 0.25;

export const TokensPanel: React.FC = React.memo(() => {
  const showTokensPanel = useObservable(uiQuery.debug_showTokensPanel$, uiStore.getValue().debug_showTokensPanel);
  const hand = useObservable(gameQuery.myPlayerTokens$, null);
  const { size } = useThree();

  console.log('tokens on panel', hand);

  const { panelPosition } = useSpring({
    panelPosition: [0, showTokensPanel ? 0 :  -panelHeight(size.height), -0.1],
    config: { mass: 10, tension: 2000, friction: 300, precision: 0.00001 },
  });

  const createTokenElements = (tokens: any[]) => {
    if (tokens) {
      return tokens.map((token, index) => (
            <Suspense key={`handToken${index}`} fallback={null}>
              <Token token={token} hexRadius={size.width * 0.05} position={new Vector3(0.2 * size.width * index - size.width * 0.2, 0, 0.1)} />
            </Suspense>
      ))
    }
  };

  return (
    <animated.group position={panelPosition as any}>
      {/*Panel*/}
      <group>
        <mesh>
          <planeBufferGeometry attach="geometry" args={[size.width * 0.9, panelHeight(size.height)]} />
          <meshBasicMaterial  attach="material" color={0xffff00} />
        </mesh>
      </group>
      <group>
        { createTokenElements(hand) }
      </group>
    </animated.group>
  );
});
