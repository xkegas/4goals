import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Card} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Navbar from "../komponenty/Navbar";

interface typyDanych {
    match_hometeam_name: string;
    match_awayteam_name: string;
    odd_bookmakers: string;
}

function Przewidywanie() {
  const [gry, setGry] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wywieltWszystkie, setWyswieltWszystkie] = useState(true);
  const [wyswietlWyszukane, setWyswietlWyszukane] = useState(false);
  const [kursy, setKursy] = useState([]);

  const filteredData = gry.filter((item: typyDanych) => {
    return (
      item.match_hometeam_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.match_awayteam_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
  
  useEffect(() => {
    if(searchTerm === "")
    {
        setWyswieltWszystkie(true);
        setWyswietlWyszukane(false);
    }
    dane();
  },[])
  const dane = () => {
    const data = new Date();
    const dzien = data.getDate();
    const miesiac = data.getMonth() + 1;
    const rok = data.getFullYear();
    const zformanowanaData = `${rok}-${miesiac < 10 ? '0' : ''}${miesiac}-${dzien < 10 ? '0' : ''}${dzien}`;

    const data2 = new Date();
    data2.setDate(data2.getDate() + 5);
    const dzien2 = data2.getDate();
    const miesiac2 = data2.getMonth() + 1;
    const rok2 = data2.getFullYear();
    const tydzienPo = `${rok2}-${miesiac2 < 10 ? '0' : ''}${miesiac2}-${dzien2 < 10 ? '0' : ''}${dzien2}`;

    axios.get(`https://apiv3.apifootball.com/?action=get_predictions&from=${zformanowanaData}&to=${tydzienPo}&APIkey=${process.env.token}`).then((res) => {
      if(res.data)
      {
        setGry(res.data);
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
    axios.get(`https://apiv3.apifootball.com/?action=get_odds&from=${zformanowanaData}&to=${tydzienPo}&APIkey=token`).then((res) => {
      if(res.data)
      {
        const filtr = res.data.filter((item: typyDanych) => item.odd_bookmakers === "bwin");
        setKursy(filtr);
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
        <Navbar/>
      <div className='informacje'>
      <input
        type="text"
        placeholder="Wpisz drużynę"
        value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value); setWyswieltWszystkie(false); setWyswietlWyszukane(true)}}
      />
      <br></br>
      <br></br>
      <h4>Wyświetlane są mecze w przeciągu pięciu dni!</h4>
      {wywieltWszystkie && gry.map((item: { country_name: string, league_name: string, match_awayteam_name: string, match_awayteam_score: string, match_date: string, match_hometeam_name: string, match_status: string, match_time: string, prob_AW: string, prob_AW_D: string, prob_D: string, prob_HW: string, prob_HW_D: string, prob_HW_AW: string, prob_bts: string, prob_ots: string, match_live: string, match_hometeam_score: string, match_id: string}, index: number) => (
          <div className='d-flex justify-content-center' key={index}>
             <Card style={{ width: '18rem', margin: '20px' }}>
        <Card.Body>
            <Card.Title>{item.match_hometeam_name} vs {item.match_awayteam_name}</Card.Title>
            <Card.Text>{item.country_name} - {item.league_name}</Card.Text>
            <Card.Text>{item.match_date} | {item.match_time}</Card.Text>
            {item.match_status === "Finished" ? <Card.Text>Koniec spotkania</Card.Text> : item.match_status === "Half Time" ?  <Card.Text> Przerwa </Card.Text> : item.match_status === "" ? <Card.Text>Mecz nie zaczął się </Card.Text>:<Card.Text>{item.match_status}'</Card.Text>}
            {item.match_live === "1" ? <Card.Text>Aktualny wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text> : item.match_status===""&&item.match_live==="0" ? null :<Card.Text>Końcowy wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text>}
            <ProgressBar>
  <ProgressBar
    variant="success"
    now={Number(item.prob_HW)}
    max={100} 
    key={1}
    label="1"
  />
  <ProgressBar
    variant="warning"
    now={Number(item.prob_D)}
    max={100}
    key={2}
    label="X"
  />
   <ProgressBar
    variant="danger"
    now={Number(item.prob_AW)}
    max={100}
    key={3}
    label="2"
  />
</ProgressBar>
            <Card.Text>1 - {parseInt(item.prob_HW)}%</Card.Text>
            <Card.Text>1X - {parseInt(item.prob_HW_D)}%</Card.Text>
            <Card.Text>2 - {parseInt(item.prob_AW)}%</Card.Text>
            <Card.Text>2X - {parseInt(item.prob_AW_D)}%</Card.Text>
            <Card.Text>12 - {parseInt(item.prob_HW_AW)}%</Card.Text>
            <Card.Text>X - {parseInt(item.prob_D)}%</Card.Text>
            <Card.Text>BTTS - Tak: {parseInt(item.prob_bts)}% | Nie: {parseInt(item.prob_ots)}%</Card.Text>
            {kursy.map((item2: { match_id: string, odd_1: string, odd_1x: string, odd_2: string, odd_x2: string, odd_x: string, bts_yes: string, bts_no: string, odd_date: string}, index: number) => (
            item.match_id === item2.match_id ? (
              <span key={index}>
              <Card.Text><a title={"Data kurów: "+item2.odd_date}>Kursy</a></Card.Text>
              <Card.Text>1 - {item2.odd_1}</Card.Text>
              <Card.Text>1X - {item2.odd_1x}</Card.Text>
              <Card.Text>2 - {item2.odd_2}</Card.Text>
              <Card.Text>2X - {item2.odd_x2}</Card.Text>
              <Card.Text>X - {item2.odd_x}</Card.Text>
              <Card.Text>BTTS - Tak: {item2.bts_yes} | Nie: {item2.bts_no}</Card.Text>
              </span>) 
              : (null)
            ))}
            </Card.Body>
        </Card>
            </div>
        ))}
        
        {wyswietlWyszukane && filteredData.map((item: { country_name: string, league_name: string, match_awayteam_name: string, match_awayteam_score: string, match_date: string, match_hometeam_name: string, match_status: string, match_time: string, prob_AW: string, prob_AW_D: string, prob_D: string, prob_HW: string, prob_HW_D: string, prob_HW_AW: string, prob_bts: string, prob_ots: string, match_live: string, match_hometeam_score: string, match_id: string}, index: number) => (
        <div className='d-flex justify-content-center' key={index}>
            <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                    <Card.Title>{item.match_hometeam_name} vs {item.match_awayteam_name}</Card.Title>
                    <Card.Text>{item.country_name} - {item.league_name}</Card.Text>
                    <Card.Text>{item.match_date} | {item.match_time}</Card.Text>
                    {item.match_status === "Finished" ? <Card.Text>Koniec spotkania</Card.Text> : item.match_status === "" ? <Card.Text>Mecz nie zaczął się </Card.Text>:<Card.Text>{item.match_status}'</Card.Text>}
                    {item.match_live === "1" ? <Card.Text>Aktualny wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text> : item.match_status===""&&item.match_live==="0" ? null :<Card.Text>Końcowy wynik: {item.match_hometeam_score}:{item.match_awayteam_score}</Card.Text>}
                    <ProgressBar>
  <ProgressBar
    variant="success"
    now={Number(item.prob_HW)}
    max={100} 
    key={1}
    label="1"
  />
  <ProgressBar
    variant="warning"
    now={Number(item.prob_D)}
    max={100}
    key={2}
    label="X"
  />
   <ProgressBar
    variant="danger"
    now={Number(item.prob_AW)}
    max={100}
    key={3}
    label="2"
  />
</ProgressBar>
                    <Card.Text>1 - {parseInt(item.prob_HW)}%</Card.Text>
                    <Card.Text>1X - {parseInt(item.prob_HW_D)}%</Card.Text>
                    <Card.Text>2 - {parseInt(item.prob_AW)}%</Card.Text>
                    <Card.Text>2X - {parseInt(item.prob_AW_D)}%</Card.Text>
                    <Card.Text>12 - {parseInt(item.prob_HW_AW)}%</Card.Text>
                    <Card.Text>X - {parseInt(item.prob_D)}%</Card.Text>
                    <Card.Text>BTTS - Tak: {parseInt(item.prob_bts)}% | Nie: {parseInt(item.prob_ots)}%</Card.Text>
                    {kursy.map((item2: { match_id: string, odd_1: string, odd_1x: string, odd_2: string, odd_x2: string, odd_x: string, bts_yes: string, bts_no: string, odd_date: string}, index: number) => (
                    item.match_id === item2.match_id ? (
                    <span key={index}>
                      <Card.Text><a title={"Data kurów: "+item2.odd_date}>Kursy</a></Card.Text>
                      <Card.Text>1 - {item2.odd_1}</Card.Text>
                      <Card.Text>1X - {item2.odd_1x}</Card.Text>
                      <Card.Text>2 - {item2.odd_2}</Card.Text>
                      <Card.Text>2X - {item2.odd_x2}</Card.Text>
                      <Card.Text>X - {item2.odd_x}</Card.Text>
                      <Card.Text>BTTS - Tak: {item2.bts_yes} | Nie: {item2.bts_no}</Card.Text>
                    </span>) 
                  : (null)
               ))}
                </Card.Body>
            </Card>
        </div>
      ))}
       </div>
    </div>
  );
}

export default Przewidywanie;
