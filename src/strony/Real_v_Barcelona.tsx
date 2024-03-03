import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Card} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../komponenty/Navbar";

function Real_v_Barcelona() {
  const [gryNaSiebie, setGryNaSiebie] = useState([]);
  const [gryRealu, setGryRealu] = useState([]);
  const [gryBarcelony, setGryBarcelony] = useState([]);
  
  useEffect(() => {
    h2h();
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

  const h2h = () => {
    axios.get(`https://apiv3.apifootball.com/?action=get_H2H&firstTeamId=76&secondTeamId=97&APIkey=${process.env.token}`).then((res) => {
      if(res.data)
      {
        setGryNaSiebie(res.data.firstTeam_VS_secondTeam);
        setGryRealu(res.data.firstTeam_lastResults);
        setGryBarcelony(res.data.secondTeam_lastResults);
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
const ostatnie_5_h2h = gryNaSiebie.slice(0,5);
const ostatnie_mecze_realu = gryRealu.slice(0,5);
const ostatnie_mecze_barcelony = gryBarcelony.slice(0,5);
  return (
    <div className="App">
        <ToastContainer/>
        <Navbar/>
      <div className='head2head'>
        <h1>H2H - Real vs Barcelona </h1>
        {ostatnie_5_h2h.length > 0 ? (
    ostatnie_5_h2h.map((item: { country_name: string, league_name: string, match_hometeam_name: string, match_awayteam_name: string, match_time: string, match_date: string, match_hometeam_score: string, match_awayteam_score: string, match_live: string, match_status: string}, index: number) => (
        <div className='gra d-flex justify-content-center' key={index}>
            <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                    <Card.Title>{item.match_hometeam_name} vs {item.match_awayteam_name} </Card.Title>
                    <Card.Text>{item.country_name} - {item.league_name}</Card.Text>
                    <Card.Text>{item.match_date} | {item.match_time}</Card.Text>
                    {item.match_status === "Finished" ? null : item.match_status === "Half Time" ?  <Card.Text> Przerwa </Card.Text> : <Card.Text>{item.match_status}'</Card.Text>}
                    {item.match_live === "1" ? <Card.Text>Aktualny wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text> : <Card.Text>Końcowy wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text>}
                </Card.Body>
            </Card>
        </div>
    ))
) : (
    <h4>Brak ostatnio rozegranych meczów pomiędzy drużynami</h4>
)}
    <h1>Ostatnie 5 gier Realu Madryt</h1>
    {ostatnie_mecze_realu.map((item: { country_name: string, league_name: string, match_hometeam_name: string, match_awayteam_name: string, match_time: string, match_date: string, match_hometeam_score: string, match_awayteam_score: string, match_live: string, match_status: string}, index: number) => (
        <div className='gra d-flex justify-content-center' key={index}>
        <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Body>
            <Card.Title>{item.match_hometeam_name} vs {item.match_awayteam_name} </Card.Title>
            <Card.Text>{item.country_name} - {item.league_name}</Card.Text>
            <Card.Text>{item.match_date} | {item.match_time}</Card.Text>
            {item.match_status === "Finished" ? null : item.match_status === "Half Time" ?  <Card.Text> Przerwa </Card.Text> : <Card.Text>{item.match_status}'</Card.Text>}
            {item.match_live === "1" ? <Card.Text>Aktualny wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text> : <Card.Text>Końcowy wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text>}
            </Card.Body>
        </Card>
        </div>
    ))}



    <h1>Ostatnie 5 gier Barcelony</h1>
    {ostatnie_mecze_barcelony.map((item: { country_name: string, league_name: string, match_hometeam_name: string, match_awayteam_name: string, match_time: string, match_date: string, match_hometeam_score: string, match_awayteam_score: string, match_live: string, match_status: string}, index: number) => (
        <div className='gra d-flex justify-content-center' key={index}>
        <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Body>
            <Card.Title>{item.match_hometeam_name} vs {item.match_awayteam_name} </Card.Title>
            <Card.Text>{item.country_name} - {item.league_name}</Card.Text>
            <Card.Text>{item.match_date} | {item.match_time}</Card.Text>
            {item.match_status === "Finished" ? null : item.match_status === "Half Time" ?  <Card.Text> Przerwa </Card.Text> : <Card.Text>{item.match_status}'</Card.Text>}
            {item.match_live === "1" ? <Card.Text>Aktualny wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text> : <Card.Text>Końcowy wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text>}
            </Card.Body>
        </Card>
        </div>
    ))}
      
      
      </div>
    </div>
  );
}

export default Real_v_Barcelona;
