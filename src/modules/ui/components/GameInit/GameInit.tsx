import React, {useEffect, useState} from 'react';
import './styles.scss';
import socketIOCient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3333';
const socket = socketIOCient(ENDPOINT);

interface Player {
    name: string;
}

export const GameInit : React.FC = () => {
    const joinGame = () => {
        socket.emit('joinPlayer', { name: player})
    }

    const handleJoinPlayer = (playerFromServer: Player) => {
        if (playerFromServer.name === player) {
            setThisPlayer(playerFromServer.name);
        } else {
            addPlayer((prevState: Player[]) => prevState.concat([playerFromServer]));
        }
    }

    useEffect(() => {
        socket.on('joinedPlayer', (msg) => handleJoinPlayer(msg));
    }, []);

    const joinedPlayersTiles = () => joinedPlayers.filter(pl => pl.name === thisPlayer).map((player: {name:string}, index: number) => (
        <div key={`player${index}-${player.name}`}>
            { player.name }
        </div>
    ));

    const displaySetThisPlayer = () => {
        return (
            <div>
                <p>
                    Your nick: <input type={"text"} value={player} onChange={(event) => setPlayer(event.currentTarget.value)}/>
                </p>
                <button type={"button"} onClick={joinGame}>Join</button>
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

    const [player, setPlayer] = useState('Player1');
    const [thisPlayer, setThisPlayer] = useState(null);
    const [joinedPlayers, addPlayer] = useState([]);

    return (
        <div className='GameInit'>
            Hex Game Init

            { thisPlayer ? displayThisJoinedPlayerInfo() : displaySetThisPlayer() }
            { !!joinedPlayers.length && (
                <div>
                Other players joined:
                { joinedPlayersTiles() }
            </div>) }
        </div>
    )
}