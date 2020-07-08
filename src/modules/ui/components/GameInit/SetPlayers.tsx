import React, {useEffect, useState} from 'react';
import './styles.scss';
import socketIOCient from 'socket.io-client';
import {Army} from "../../../../models/hex.model";

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
    }

    const handleJoinPlayer = (playerFromServer: Player) => {
        setThisPlayer(playerFromServer.name);
    }

  const confirmReady = () => {
    setPlayerSocket.emit('playerReady', { player: thisPlayer, ready:true, army});
  };

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

  useEffect(() => {
    setPlayerSocket.on('joinedPlayer', (plyr) => handleJoinPlayer(plyr));
    setPlayerSocket.on('playersList', (playersList: Player[]) => setOtherPlayers(playersList));
    setPlayerSocket.on('ready', () => console.log('ready'));
    setPlayerSocket.on('startTheGame', () => {
      setPlayerSocket.close();
      gameSocket.emit('initialRound', { player: thisPlayer, army });
    });
  }, []);

    const [player, setPlayer] = useState('Player');
    const [army, setArmy] = useState(Army.BORGO);
    const [thisPlayer, setThisPlayer] = useState(null);
    const [otherPlayers, setOtherPlayers] = useState([]);

    return (
        <div className='SetPlayers'>
            Hex Game Init

            { thisPlayer ? displayThisJoinedPlayerInfo() : displaySetThisPlayer() }
            { thisPlayer && (<div>
                Other players joined:
                { joinedPlayersTiles() }
            </div>)
                }
        </div>
    )
}