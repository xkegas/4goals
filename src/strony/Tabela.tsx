import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../komponenty/Navbar";

function Tabela() {
  const [wybor, setWybor] = useState('premierleague');
  const [danePrem, setDanePrem] = useState([]);
  const [daneBundes, setDaneBundes] = useState([]);
  const [daneLaliga, setDaneLaliga] = useState([]);
  const [daneSeriea, setDaneSeria] = useState([]);
  const [daneLigue1, setDaneLigue1] = useState([]);
  const [prem, setPrem] = useState(true);
  const [bundes, setBundes] = useState(false);
  const [laliga, setLaliga] = useState(false);
  const [seriea, setSeriea] = useState(false);
  const [ligue1, setLigue1] = useState(false);
  
  useEffect(() => {
    tabela();
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

  const tabela = () => {
    axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=152&APIkey=${process.env.token}`).then((res) => {
      if(res.data)
      {
        setDanePrem(res.data);
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
    axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=175&APIkey=${process.env.data}`).then((res) => {
      if(res.data)
      {
        setDaneBundes(res.data);
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
    axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=302&APIkey=${process.env.data}`).then((res) => {
      if(res.data)
      {
        setDaneLaliga(res.data);
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
    axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=207&APIkey=${process.env.data}`).then((res) => {
      if(res.data)
      {
        setDaneSeria(res.data);
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
    axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=168&APIkey=${process.env.data}`).then((res) => {
      if(res.data)
      {
        setDaneLigue1(res.data);
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

    const handleSelectChange = (event: any) => {
        const wybor = event.target.value;
        setWybor(wybor);
        if(wybor === "premierleague")
        {
            setPrem(true);
            setBundes(false);
            setLaliga(false); 
            setLigue1(false);
            setSeriea(false);
        }
        else if(wybor === "bundesliga")
        {
            setBundes(true);
            setPrem(false);
            setLaliga(false);
            setLigue1(false);
            setSeriea(false);
        }
        else if(wybor === "laliga")
        {
            setLaliga(true);
            setBundes(false);
            setPrem(false);
            setLigue1(false);
            setSeriea(false);
        }
        else if(wybor === "seriea")
        {
            setSeriea(true);
            setLaliga(false);
            setBundes(false);
            setPrem(false);
            setLigue1(false);
        }
        else
        {
            setLigue1(true);
            setSeriea(false);
            setLaliga(false);
            setBundes(false);
            setPrem(false);
        }
    };
  return (
    <div className="App">
            <ToastContainer />
            <Navbar/>
      <div className='informacje'>
      <select name="ligii" id="ligii" value={wybor} onChange={handleSelectChange} className="form-select mx-auto w-auto" >
        <option value="premierleague">Premier League</option>
        <option value="bundesliga">Bundesliga</option>
        <option value="laliga">La Liga</option>
        <option value="seriea">Serie A</option>
        <option value="ligue1">Ligue 1</option>
      </select>
      <br></br>

        {prem && (
        <table className='table'>
        <thead className="thead-dark">
        <tr>
            <th>Klub</th>
            <th>Mecze</th>
            <th>Wygrane</th>
            <th>Remisy</th>
            <th>Porażki</th>
            <th>Bramki zyskane</th>
            <th>Bramki stracone</th>
            <th>Bilans bramek</th>
            <th>Punkty</th>
        </tr>
        </thead>
        <tbody>
      {danePrem.map((item: { team_name: string, overall_league_payed: string, overall_league_W: string, overall_league_D: string, overall_league_L: string, overall_league_GF: string, overall_league_GA: string, overall_league_PTS: string, overall_promotion: string }, index: number) => (
        item.overall_promotion == "Promotion - Champions League (Group Stage: )" ?(
        <tr key={index} className='table-primary'>
            <td>{index+1}. {item.team_name}</td>
            <td>{item.overall_league_payed}</td>
            <td>{item.overall_league_W}</td>
            <td>{item.overall_league_D}</td>
            <td>{item.overall_league_L}</td>
            <td>{item.overall_league_GF}</td>
            <td>{item.overall_league_GA}</td>
            <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
            <td>{item.overall_league_PTS}</td>
        </tr>)
        : item.overall_promotion == "Relegation - Championship" ?(
        <tr key={index} className='table-danger'>
            <td>{index+1}. {item.team_name}</td>
            <td>{item.overall_league_payed}</td>
            <td>{item.overall_league_W}</td>
            <td>{item.overall_league_D}</td>
            <td>{item.overall_league_L}</td>
            <td>{item.overall_league_GF}</td>
            <td>{item.overall_league_GA}</td>
            <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
            <td>{item.overall_league_PTS}</td>
        </tr>):
         <tr key={index} >
         <td>{index+1}. {item.team_name}</td>
         <td>{item.overall_league_payed}</td>
         <td>{item.overall_league_W}</td>
         <td>{item.overall_league_D}</td>
         <td>{item.overall_league_L}</td>
         <td>{item.overall_league_GF}</td>
         <td>{item.overall_league_GA}</td>
         <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
         <td>{item.overall_league_PTS}</td>
     </tr>
        ))}
        </tbody>
        </table>
        )}

        {bundes && (
        <table className='table'>
        <thead className="thead-dark">
        <tr>
            <th>Klub</th>
            <th>Mecze</th>
            <th>Wygrane</th>
            <th>Remisy</th>
            <th>Porażki</th>
            <th>Bramki zyskane</th>
            <th>Bramki stracone</th>
            <th>Bilans bramek</th>
            <th>Punkty</th>
        </tr>
        </thead>
        <tbody>
      {daneBundes.map((item: { team_name: string, overall_league_payed: string, overall_league_W: string, overall_league_D: string, overall_league_L: string, overall_league_GF: string, overall_league_GA: string, overall_league_PTS: string, overall_promotion: string }, index: number) => (
        item.overall_promotion == "Promotion - Champions League (Group Stage: )" ?(
          <tr key={index} className='table-primary'>
              <td>{index+1}. {item.team_name}</td>
              <td>{item.overall_league_payed}</td>
              <td>{item.overall_league_W}</td>
              <td>{item.overall_league_D}</td>
              <td>{item.overall_league_L}</td>
              <td>{item.overall_league_GF}</td>
              <td>{item.overall_league_GA}</td>
              <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
              <td>{item.overall_league_PTS}</td>
          </tr>)
          : item.overall_promotion == "Relegation - 2. Bundesliga" ?(
          <tr key={index} className='table-danger'>
              <td>{index+1}. {item.team_name}</td>
              <td>{item.overall_league_payed}</td>
              <td>{item.overall_league_W}</td>
              <td>{item.overall_league_D}</td>
              <td>{item.overall_league_L}</td>
              <td>{item.overall_league_GF}</td>
              <td>{item.overall_league_GA}</td>
              <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
              <td>{item.overall_league_PTS}</td>
          </tr>):
           <tr key={index} >
           <td>{index+1}. {item.team_name}</td>
           <td>{item.overall_league_payed}</td>
           <td>{item.overall_league_W}</td>
           <td>{item.overall_league_D}</td>
           <td>{item.overall_league_L}</td>
           <td>{item.overall_league_GF}</td>
           <td>{item.overall_league_GA}</td>
           <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
           <td>{item.overall_league_PTS}</td>
       </tr>
        ))}
        </tbody>
        </table>
        )}

{laliga && (
        <table className='table'>
        <thead className="thead-dark">
        <tr>
            <th>Klub</th>
            <th>Mecze</th>
            <th>Wygrane</th>
            <th>Remisy</th>
            <th>Porażki</th>
            <th>Bramki zyskane</th>
            <th>Bramki stracone</th>
            <th>Bilans bramek</th>
            <th>Punkty</th>
        </tr>
        </thead>
        <tbody>
      {daneLaliga.map((item: { team_name: string, overall_league_payed: string, overall_league_W: string, overall_league_D: string, overall_league_L: string, overall_league_GF: string, overall_league_GA: string, overall_league_PTS: string, overall_promotion: string  }, index: number) => (
        
        item.overall_promotion == "Promotion - Champions League (Group Stage: )" ?(
          <tr key={index} className='table-primary'>
              <td>{index+1}. {item.team_name}</td>
              <td>{item.overall_league_payed}</td>
              <td>{item.overall_league_W}</td>
              <td>{item.overall_league_D}</td>
              <td>{item.overall_league_L}</td>
              <td>{item.overall_league_GF}</td>
              <td>{item.overall_league_GA}</td>
              <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
              <td>{item.overall_league_PTS}</td>
          </tr>)
          : item.overall_promotion == "Relegation - LaLiga2" ?(
          <tr key={index} className='table-danger'>
              <td>{index+1}. {item.team_name}</td>
              <td>{item.overall_league_payed}</td>
              <td>{item.overall_league_W}</td>
              <td>{item.overall_league_D}</td>
              <td>{item.overall_league_L}</td>
              <td>{item.overall_league_GF}</td>
              <td>{item.overall_league_GA}</td>
              <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
              <td>{item.overall_league_PTS}</td>
          </tr>):
           <tr key={index} >
           <td>{index+1}. {item.team_name}</td>
           <td>{item.overall_league_payed}</td>
           <td>{item.overall_league_W}</td>
           <td>{item.overall_league_D}</td>
           <td>{item.overall_league_L}</td>
           <td>{item.overall_league_GF}</td>
           <td>{item.overall_league_GA}</td>
           <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
           <td>{item.overall_league_PTS}</td>
       </tr>
        ))}
        </tbody>
        </table>
        )}

{seriea && (
        <table className='table'>
        <thead className="thead-dark">
        <tr>
            <th>Klub</th>
            <th>Mecze</th>
            <th>Wygrane</th>
            <th>Remisy</th>
            <th>Porażki</th>
            <th>Bramki zyskane</th>
            <th>Bramki stracone</th>
            <th>Bilans bramek</th>
            <th>Punkty</th>
        </tr>
        </thead>
        <tbody>
      {daneSeriea.map((item: { team_name: string, overall_league_payed: string, overall_league_W: string, overall_league_D: string, overall_league_L: string, overall_league_GF: string, overall_league_GA: string, overall_league_PTS: string, overall_promotion: string  }, index: number) => (
        
        item.overall_promotion == "Promotion - Champions League (Group Stage: )" ?(
          <tr key={index} className='table-primary'>
              <td>{index+1}. {item.team_name}</td>
              <td>{item.overall_league_payed}</td>
              <td>{item.overall_league_W}</td>
              <td>{item.overall_league_D}</td>
              <td>{item.overall_league_L}</td>
              <td>{item.overall_league_GF}</td>
              <td>{item.overall_league_GA}</td>
              <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
              <td>{item.overall_league_PTS}</td>
          </tr>)
          : item.overall_promotion == "Relegation - Serie B" ?(
          <tr key={index} className='table-danger'>
              <td>{index+1}. {item.team_name}</td>
              <td>{item.overall_league_payed}</td>
              <td>{item.overall_league_W}</td>
              <td>{item.overall_league_D}</td>
              <td>{item.overall_league_L}</td>
              <td>{item.overall_league_GF}</td>
              <td>{item.overall_league_GA}</td>
              <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
              <td>{item.overall_league_PTS}</td>
          </tr>):
           <tr key={index} >
           <td>{index+1}. {item.team_name}</td>
           <td>{item.overall_league_payed}</td>
           <td>{item.overall_league_W}</td>
           <td>{item.overall_league_D}</td>
           <td>{item.overall_league_L}</td>
           <td>{item.overall_league_GF}</td>
           <td>{item.overall_league_GA}</td>
           <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
           <td>{item.overall_league_PTS}</td>
       </tr>
        ))}
        </tbody>
        </table>
        )}

{ligue1 && (
        <table className='table'>
        <thead className="thead-dark">
        <tr>
            <th>Klub</th>
            <th>Mecze</th>
            <th>Wygrane</th>
            <th>Remisy</th>
            <th>Porażki</th>
            <th>Bramki zyskane</th>
            <th>Bramki stracone</th>
            <th>Bilans bramek</th>
            <th>Punkty</th>
        </tr>
        </thead>
        <tbody>
      {daneLigue1.map((item: { team_name: string, overall_league_payed: string, overall_league_W: string, overall_league_D: string, overall_league_L: string, overall_league_GF: string, overall_league_GA: string, overall_league_PTS: string, overall_promotion: string  }, index: number) => (
  
  item.overall_promotion == "Promotion - Champions League (Group Stage: )" ?(
    <tr key={index} className='table-primary'>
        <td>{index+1}. {item.team_name}</td>
        <td>{item.overall_league_payed}</td>
        <td>{item.overall_league_W}</td>
        <td>{item.overall_league_D}</td>
        <td>{item.overall_league_L}</td>
        <td>{item.overall_league_GF}</td>
        <td>{item.overall_league_GA}</td>
        <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
        <td>{item.overall_league_PTS}</td>
    </tr>)
    : item.overall_promotion == "Relegation - Ligue 2" ?(
    <tr key={index} className='table-danger'>
        <td>{index+1}. {item.team_name}</td>
        <td>{item.overall_league_payed}</td>
        <td>{item.overall_league_W}</td>
        <td>{item.overall_league_D}</td>
        <td>{item.overall_league_L}</td>
        <td>{item.overall_league_GF}</td>
        <td>{item.overall_league_GA}</td>
        <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
        <td>{item.overall_league_PTS}</td>
    </tr>):
     <tr key={index} >
     <td>{index+1}. {item.team_name}</td>
     <td>{item.overall_league_payed}</td>
     <td>{item.overall_league_W}</td>
     <td>{item.overall_league_D}</td>
     <td>{item.overall_league_L}</td>
     <td>{item.overall_league_GF}</td>
     <td>{item.overall_league_GA}</td>
     <td>{Number(item.overall_league_GF)-Number(item.overall_league_GA)}</td>
     <td>{item.overall_league_PTS}</td>
 </tr>
        ))}
        </tbody>
        </table>
        )}
      </div>
    </div>
  );
}

export default Tabela;
