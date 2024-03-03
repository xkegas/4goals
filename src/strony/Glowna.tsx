import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../komponenty/Navbar";
import ronaldo from "../img/ronaldo.png"
import beligol from "../img/beligol.png"

function Glowna() {
  return (
    <div className="App">
        <Navbar />
        <h1>⚽Witamy w świecie piłki nożnej⚽</h1>
        <img src={ronaldo} alt="ronaldo" />
        <br />
        <img src={beligol} alt="beligol" />
    </div>
  );
}

export default Glowna;
