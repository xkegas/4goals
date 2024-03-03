import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Card} from "react-bootstrap";
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import photo from "../img/default-photo.jpg";
import Navbar from "../komponenty/Navbar";

interface FormData {
    playerName: string;
}

function Gracz() {
    const [dane, setDane] = useState([]);
    const schemat = yup.object().shape({
        playerName: yup.string().required("Imię i nazwisko gracza jest wymagane!"),
    });
  
     const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schemat),
    });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const url = `https://apiv3.apifootball.com/?action=get_players&player_name=${data.playerName}&APIkey=${process.env.token}`;
    axios.get(url).then((res) => {
      if(res.data)
      {
        if(res.data.error !== 404)
        {
          setDane(res.data);
        }
        else {
          showToast();
        }
    }
    });
  };
  const showToast = () => {
    toast.error('Nie znaleziono podanego gracza!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: '#8b0000',
        color: 'white', 
      },
    });
  };
  return (
    <div className="App">
        <ToastContainer />
        <Navbar/>
      <div className='informacjeGracz'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="K. Benzema"
          {...register("playerName")}
        />  
        <br></br>
        <br></br>
        <input type="submit" className='btn btn-outline-primary'/>
        <br></br>
        <br></br>
        {errors.playerName ? <p>{errors.playerName.message}</p> : null}
      </form>
      {dane.map((item: { player_name: string, player_image: string, player_age: string, player_type: string, player_goals: string, player_assists: string, player_match_played: string, team_name: string, player_birthdate: string, player_number: string }, index: number) => (
        item.player_type != "Coach" ? (
          <div className='d-flex justify-content-center' key={index}>
             <Card style={{ width: '18rem', margin: '20px' }}>
        <Card.Body>
            <Card.Title>{item.player_name}</Card.Title>
            {item.player_image !== ""? <Card.Img variant='top' src={item.player_image} alt='Zdjęcie gracza'></Card.Img> : <Card.Img variant='top' src={photo} alt='Zdjęcie gracza'></Card.Img>}
            <Card.Text>Wiek - {item.player_age === "" ? "Brak danych": item.player_age} {item.player_birthdate === "" ? null : `(${item.player_birthdate})`} </Card.Text>
            <Card.Text>Aktualna drużyna - {item.team_name}</Card.Text>
            <Card.Text>Numer na koszulce - {item.player_number === "" ? "Brak danych": item.player_number}</Card.Text>
            <Card.Text>{`Typ gracza - ${
                item.player_type === "Forwards"
                ? "Napastnicy"
                : item.player_type === "Defenders"
                ? "Obrońcy"
                : item.player_type === "Goalkeepers"
                ? "Bramkarze"
                : item.player_type === "Midfielders"
                ? "Pomocnicy"
                : item.player_type === "Coach"
                ? "Trener"
                : "Brak danych"
            }`}</Card.Text>
            <Card.Text>G/A - {item.player_goals === "" ? 0 : item.player_goals}/{item.player_assists === "" ? 0 : item.player_assists} w {item.player_match_played === "" ? 0 : item.player_match_played} meczach</Card.Text>
            </Card.Body>
        </Card>
            </div>
        ) : null
        ))}
      
      </div>
    </div>
  );
}

export default Gracz;
