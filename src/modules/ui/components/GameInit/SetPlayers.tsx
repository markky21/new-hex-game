import React, {useEffect, useState} from 'react';
import './styles.scss';
import socketIOCient from 'socket.io-client';
import {Army} from "../../../../models/hex.model";

const ENDPOINT = 'http://127.0.0.1:3333/setPlayers';
const socket = socketIOCient(ENDPOINT);

interface Player {
    name: string;
    army: string;
    ready?: boolean;
}

export const SetPlayers : React.FC = () => {
    const joinGame = () => {
        socket.emit('joinPlayer', { name: player})
    }

    const handleJoinPlayer = (playerFromServer: Player) => {
        setThisPlayer(playerFromServer.name);
    }

    useEffect(() => {
        socket.on('joinedPlayer', (msg) => handleJoinPlayer(msg));
        socket.on('ready', () => thisPlayer.ready = true);
        socket.on('playersList', (playersList: Player[]) => setOtherPlayers(playersList));
    }, []);

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

    const confirmReady = () => {
        socket.emit('playerReady', { player: thisPlayer, ready:true});
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