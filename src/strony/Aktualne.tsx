import React from 'react';
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../komponenty/Navbar";
import {useAktualnieGraja} from '../useAktualnieGraja';
import pessi from "../img/pessi.png"

function Aktualne() {
  const [dane, setDane] = useState([]);
  const [graja, setGraja] = useAktualnieGraja();
  const [blad, setBlad] = useState(false);
  
  useEffect(() => {
    gry();
  },[])

  const showToast = () => {
    toast.error('Wystąpił błąd z pobraniem danych', {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: '#8b0000',
        color: 'white', 
      },
    });
  }

  const gry = () => {
    axios.get(`https://apiv3.apifootball.com/?action=get_events&APIkey=${process.env.token}&match_live=1`).then((res) => {
      if(res.data)
      {
        if(res.data.error === 404)
          setBlad(true);
        else{
          setDane(res.data);
          setGraja(true);
          setBlad(false);
        }
      }
      else
      {
        setGraja(false);
      }
    })
    .catch((error) => {
      if (error.response) {
        setBlad(true);
        showToast();
      } else if (error.request) {
        setBlad(true);
        showToast();
      } else {
        setBlad(true);
        showToast();
      }
    }); 
}
  return (
    <div className="App">
        <ToastContainer />
        <Navbar/>
      <div className='aktualneGry'>
      {!blad && graja && (dane.map((item: { match_hometeam_name: string, match_awayteam_name: string, country_name: string, league_name: string, match_time: string, match_hometeam_score: string, match_awayteam_score: string, match_status: string, match_live: string, odd_1: string, match_id: string }, index: number) => (
          <div className='gra d-flex justify-content-center' key={index}>
            <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Body>
            <Card.Title>{item.match_hometeam_name} vs {item.match_awayteam_name} </Card.Title>
            <Card.Text>{item.country_name} - {item.league_name}</Card.Text>
            <Card.Text>Godzina rozpoczęcia: {item.match_time}</Card.Text>
            {item.match_status === "Finished" ? <Card.Text>Koniec spotkania</Card.Text> : item.match_status === "Half Time" ? <Card.Text> Przerwa </Card.Text> : <Card.Text>{item.match_status}'</Card.Text> }
            {item.match_status === "Finished" ? <Card.Text>Końcowy wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text> : <Card.Text>Aktualny wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text>}
      </Card.Body>
    </Card>
            </div>
        )))}
        {blad && !graja && (<><h1>Aktualnie nie są rozgrywane żadne mecze</h1>
        <img src={pessi} alt="pessi" /> </>
        )}
      </div>
    </div>
  );
}

export default Aktualne;
