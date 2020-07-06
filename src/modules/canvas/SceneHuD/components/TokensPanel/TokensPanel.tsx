import React, {Suspense, useCallback, useEffect} from 'react';
import { Vector3 } from 'three';
import { useThree } from 'react-three-fiber';
import { Token } from '../../../shared/Token/Token';
import { useObservable } from 'react-use';
import { uiQuery } from '../../../../../store/ui/ui.query';
import { uiStore } from '../../../../../store/ui/ui.store';
import { animated, useSpring } from '@react-spring/three';
import {gameService} from "../../../../../services/game.service";
import {shuffleArray} from "../../../../../utils/object.utils";
import {TokenClass} from "../../../../../classes/token.classes";

const panelHeight = (height) => height * 0.25;

export const TokensPanel: React.FC = React.memo(() => {
  const showTokensPanel = useObservable(uiQuery.debug_showTokensPanel$, uiStore.getValue().debug_showTokensPanel);
  const player = gameService.players.get('Desperado');
  const initialMixedTokens = shuffleArray(Object.values(player.army.tokens).flat());
  const tokenSet = useObservable(player.getPlayerTokenSet(), initialMixedTokens);
  const hand = useObservable(player.getHandTokens());
  const { size } = useThree();

  const { panelPosition } = useSpring({
    panelPosition: [0, showTokensPanel ? -size.height / 2 + panelHeight(size.height) / 2 : -size.height, 0],
    config: { mass: 10, tension: 2000, friction: 300, precision: 0.00001 },
  });

  const createTokenElements = (tokens: TokenClass[]) => {
    if (tokens) {
      return tokens.map((token, index) => (
            <Suspense key={`handToken${index}`} fallback={null}>
              <Token hexRadius={size.width * 0.1} position={new Vector3(0.2 * size.width * index - size.width * 0.2, 0, 0.1)} />
            </Suspense>
      ))
    }
  };

  useEffect(() => {
    player.drawTokens({ currentHandAmount: hand ? hand.length : 0 }, tokenSet);
  }, []);

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
        { createTokenElements(hand) }
      </group>
    </animated.group>
  );
});
