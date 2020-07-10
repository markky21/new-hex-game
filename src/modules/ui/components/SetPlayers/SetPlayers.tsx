import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import socketIOCient from 'socket.io-client';
import {Army} from "../../../../models/hex.model";
import { TokenClass } from '../../../../classes/token.classes';

const ENDPOINT = 'http://127.0.0.1:3333/';
const setPlayerSocket = socketIOCient(`${ENDPOINT}setPlayers`);
const gameSocket = socketIOCient(`${ENDPOINT}game`);

interface Player {
    name: string;
    army: string;
    ready?: boolean;
}

export const SetPlayers : React.FC = () => {
    const joinGame = () => {
        setPlayerSocket.emit('joinPlayer', { name: player });
    };

    const handleJoinPlayer = (playerFromServer: Player) => {
        setThisPlayer(playerFromServer.name);
    };

  const confirmReady = () => {
    setPlayerSocket.emit('playerReady', { player: thisPlayer, ready:true, army});
  };


    const startGame = () => {
      setPlayerSocket.close();
      gameSocket.emit('startGame', { player: thisPlayer, army});
    };


    const endRound = () => {
      setTokens(null);
      gameSocket.emit('endRound');
    }

    const joinedPlayersTiles = () => otherPlayers.filter(pl => pl.name !== player).map((player: Player, index: number) => (
                <div key={`player${index}-${player.name}`}>
                    { player.name } { player.ready && <strong>READY</strong> }
                </div>

            )
        );

    const displaySetThisPlayer = () => {
        return (
            <div>
                <p>
                    Your nick: <input type={"text"} value={player} onChange={(event) => setPlayer(event.currentTarget.value)} />
                </p>
                <button type={"button"} onClick={joinGame} disabled={player === 'Player' || !player}>Join</button>
            </div>
        )
    };

    const displayThisJoinedPlayerInfo = () => {
        return (
            <div>
                <p>
                { thisPlayer }:
                </p>
                <p>
                Army:
                </p>
                <button type="button" onClick={confirmReady}>Confirm ready to play</button>
            </div>
        )
    };

    const playToken = (token: TokenClass) => {
      gameSocket.emit('gameMove', { token })
    }

    const displayTokens = () => {
      const tokenEls: JSX.Element[]= [];

      tokens.forEach((token, index) => {
        tokenEls.push(
          <span key={`${token.name}${index}`} onClick={() => playToken(token)} style={{
            border: '2px solid rgba(0,0,0,0.5)',
            borderRadius: '10px',
            margin: '0px 10px',
            padding: '20px 20px',
            backgroundColor: 'lightgray'
          }}>{token.name}</span>
        )
      });

      return (
        <div>
          { tokenEls }
        </div>
      );
    }

  useEffect(() => {
    setPlayerSocket.on('joinedPlayer', (plyr) => handleJoinPlayer(plyr));
    setPlayerSocket.on('playersList', (playersList: Player[]) => setOtherPlayers(playersList));
    setPlayerSocket.on('ready', () => console.log('ready'));
    gameSocket.on('tokensIncoming', (tokens: TokenClass[]) => {
      setTokens(tokens)
    });

    gameSocket.on('roundStart', (msg) => {
      gameSocket.emit('startRound');
    });
  }, []);

    const [player, setPlayer] = useState('Player');
    // TODO: Defaults to Borgo, would like to use carousel element to select army
    const [army, setArmy] = useState(Army.BORGO);
    const [thisPlayer, setThisPlayer] = useState(null);
    const [otherPlayers, setOtherPlayers] = useState([]);
    const [tokens, setTokens]: [TokenClass[], Function] = useState();

    // TODO#1: Separate setPlayer and game logic
    // TODO#2: Create service for some of the actions
    useEffect(() => {
      if(thisPlayer) setPlayerSocket.on('startTheGame',  startGame);
    }, [thisPlayer, army]);

    return (
        <div className='SetPlayers'>
            Hex Game Init

            { thisPlayer ? displayThisJoinedPlayerInfo() : displaySetThisPlayer() }
            { thisPlayer && (<div>
                Other players joined:
                { joinedPlayersTiles() }
            </div>)
                }
          { tokens && displayTokens() }
          { tokens && tokens.length < 3 && <div><button onClick={endRound}>END ROUND</button></div> }
        </div>
    )
}