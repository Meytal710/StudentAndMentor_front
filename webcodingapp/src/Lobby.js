import { Link } from 'react-router-dom';
import React from 'react';
import './Lobby.css';

function Lobby({codes}) {

  return (
    <div className='LobbyContainer'>
      <h1 className="chooseCode">Choose code block</h1>
      <ul className='codeList'>
        {codes.map(code => (
          <li key={code.id}>
            <Link to={`/code/${code.id}`}>
                {code.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;

