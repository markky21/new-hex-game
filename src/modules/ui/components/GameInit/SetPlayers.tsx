import React, {useEffect, useState} from 'react';
import './styles.scss';
import socketIOCient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3333/setPlayers';
const socket = socketIOCient(ENDPOINT);

interface Player {
    name: string;
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
        socket.on('playersList', (playersList: Player[]) => setOtherPlayers(playersList));
    }, []);

    const joinedPlayersTiles = () => otherPlayers.filter(pl => pl.name !== player).map((player: Player, index: number) => (
                <div key={`player${index}-${player.name}`}>
                    { player.name }
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
            </div>
        )
    };

    const [player, setPlayer] = useState('Player');
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