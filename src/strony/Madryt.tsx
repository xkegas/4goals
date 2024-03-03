import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Card} from "react-bootstrap";
import photo from "../img/default-photo.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../komponenty/Navbar";

function Madryt() {
  const [trener, setTrener] = useState([{coach_name: "Trener drużyny"}]);
  const [rok, setRok] = useState(0);
  const [nazwa, setNazwa] = useState<string>("");
  const [kraj, setKraj] = useState<string>("");
  const [stadion, setStadion] = useState({venue_name: "Nazwa stadionu"});
  const [sklad, setSklad] = useState([]);
  
  useEffect(() => {
    team();
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

  const team = () => {
    axios.get(`https://apiv3.apifootball.com/?action=get_teams&team_id=76&APIkey=${process.env.token}`).then((res) => {
      if(res.data)
      {
        setTrener(res.data[0].coaches);
        setRok(res.data[0].team_founded);
        setNazwa(res.data[0].team_name);
        setKraj(res.data[0].team_country);
        setStadion(res.data[0].venue);
        setSklad(res.data[0].players);
      }
    })
    .catch((error) => {
      if (error.response) {
        showToast();
      } else if (error.request) {
        showToast();
      } else {
        showToast();
      }
    });
}
  return (
    <div className="App">
        <ToastContainer/>
        <Navbar />
      <div className='informacje'>
      {trener[0].coach_name} <br/>
      Rok założenia: {rok} <br/>
      Nazwa drużyny: {nazwa} <br/>
      Kraj drużyny: {kraj} <br/>
      Stadion: {stadion.venue_name}
        {sklad.map((item: { player_name: string, player_image: string }, index: number) => (
          <div className='gra d-flex justify-content-center' key={index}>
            <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Body>
            <Card.Title>{item.player_name}</Card.Title>
            {item.player_image != "" ? (
            <Card.Img
        variant='top'
        src={item.player_image}
        alt='Zdjęcie gracza'
        onError={(event: any) => {
          const target = event.target as HTMLImageElement;
          target.src = photo; 
        }}
      />
            ) : <Card.Img
            variant='top'
            src={photo}
            alt='Zdjęcie gracza'
          />}
            </Card.Body>
            </Card>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Madryt;
