import React, { useEffect, useState } from 'react';
import './styles.scss';
import {Army} from "../../../../models/hex.model";
import { ApiService } from '../../../../services/api.service';
import { Player } from '../../../../models/main.model';
import { GameEvents } from '../../../../models/game-events.model';

export const SetPlayers : React.FC = () => {
  const gameEvents = GameEvents;
  const [player, setPlayer] = useState('Player');
  // TODO: Defaults to Borgo, would like to use carousel element to select army
  const [armyType, setArmy] = useState(Army.BORGO);
  const [thisPlayer, setThisPlayer] = useState(null);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [apiService] = useState(ApiService.getInstance());
  const [playerSocket] = useState(ApiService.getInstance().socket);

    const joinGame = () => {
        playerSocket.emit(gameEvents.JOINPLAYER, { name: player });
    };

    const handleJoinedPlayer = (playerFromServer: Player) => {
      setThisPlayer(playerFromServer);
    };

  const confirmReady = () => {
    const { name } = thisPlayer;
    playerSocket.emit(gameEvents.PLAYERREADY, { name, ready:true, armyType });
  };


    const registerPlayer = () => {
      const { name } = thisPlayer;
      playerSocket.emit(gameEvents.REGISTERPLAYER, { name, armyType });
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
                { thisPlayer.name }:
                </p>
                <p>
                Army:
                </p>
                <button type="button" onClick={confirmReady}>Confirm ready to play</button>
            </div>
        )
    };

  useEffect(() => {
    apiService.dispatchEvent(gameEvents.JOINEDPLAYER, handleJoinedPlayer);
    apiService.dispatchEvent(gameEvents.PLAYERSLIST, setOtherPlayers);
    apiService.dispatchEvent(gameEvents.READY, console.log);
  }, []);

    useEffect(() => {
      if(thisPlayer) {
        apiService.dispatchEvent(gameEvents.GAMEREGISTERPLAYERS,  registerPlayer);
        apiService.awaitStartGame([thisPlayer, ...otherPlayers], thisPlayer);
      }
    }, [thisPlayer, armyType]);

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