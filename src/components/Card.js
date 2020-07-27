import React from "react";
export const Card = ({ song }) => {
    
  return (
    <div className="card">
      <img
        src={song.albumArt}
        alt=""
      />
      <div className="content">
        <h2>{song.name}</h2>
        <span>BY: {song.artist}</span>
      </div>
    </div>
  );
};
export default Card;

// Because it does not handle any custom logic but rather renders the props passed into it, we call it a Presentational Component.