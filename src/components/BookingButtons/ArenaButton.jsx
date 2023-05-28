import React from "react";
import { useNavigate } from "react-router-dom";

const ArenaButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/arena');
  }

  return (
    <div>
      <button className="arena-btn" onClick={handleClick}>
        Reservar Já!
      </button>
    </div>
  );
}

export default ArenaButton;
