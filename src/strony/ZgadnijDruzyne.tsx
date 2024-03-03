import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../komponenty/Navbar";

interface Team {
  teamName: string;
  teamBadge: string;
}

function ZgadnijDruzyne() {
    const [druzyna, setDruzyna] = useState("");
    const [proby, setProby] = useState<Team[]>([]);
    const [podpowiedz, setPodpowiedz] = useState(false);
    const [nazwaLigi, setNazwaLigii] = useState("");
    const [teamsData, setTeamsData] = useState<{ teamName: string, id: string, badge: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const filteredTeamsData = teamsData.filter((team) =>
    team.teamName.toLowerCase().includes(inputValue.toLowerCase())
    );

    const losowanie = () => {
        var liga = 0;
        var druzyna = 0;
        const ligii = [152, 175, 302, 207, 168];
        liga = ligii[Math.floor(Math.random()*ligii.length)];
        axios.get(`https://apiv3.apifootball.com/?action=get_teams&league_id=${liga}&APIkey=${process.env.token}`).then((res) => {
        if(res.data)
        {
            druzyna = Math.floor(Math.random()*res.data.length);
            setDruzyna(res.data[druzyna].team_name);
            nazwaLigii(liga);
        }
    })
    .catch((error) => {});
    }

    const uzupelnijDruzyny = async () => {
      await handleAxiosRequest(152);
      await handleAxiosRequest(175);
      await handleAxiosRequest(302);
      await handleAxiosRequest(207);
      await handleAxiosRequest(168);
    };

    const handleAxiosRequest = async (leagueId: any) => {
      try {
        const res = await axios.get(`https://apiv3.apifootball.com/?action=get_teams&league_id=${leagueId}&APIkey=${process.env.token}`);
        if (res.data) {
          const druzyny = res.data;
          const tabela = druzyny.map((druzyna:any) => ({
            id: druzyna.team_key,
            teamName: druzyna.team_name,
            badge: druzyna.team_badge,
          }));
    
          setTeamsData((prevTeamsData) => [...prevTeamsData, ...tabela]);
        }
      } catch (error) {}
    };

    useEffect(() => {
        uzupelnijDruzyny();
        losowanie();
    },[])

    const nazwaLigii = (liga: number) => {
        if(liga == 152)
            setNazwaLigii("Premier League");
        if(liga == 175)
            setNazwaLigii("Bundesliga");
        if(liga == 302)
            setNazwaLigii("La Liga");
        if(liga == 207)
            setNazwaLigii("Serie A");
        if(liga == 168)
            setNazwaLigii("Ligue 1");
    }

    const onclick = (teamName: any, teamBadge: any) => {
      if(druzyna === teamName)
      {
        setProby([...proby, { teamName: teamName, teamBadge: teamBadge }]);
        toast.success(`Udało ci się zgadnąć drużynę w ${proby.length+1} próbach\n Drużyna: ${teamName}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        losowanie();
        setProby([]);
        setPodpowiedz(false);
        setInputValue('');
    }
    else
    {
        setProby([...proby, { teamName: teamName, teamBadge: teamBadge }]);
        setInputValue('');
        toast.error('Próbuj dalej...', {
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
    }
    if(proby.length+1 == 5)
        setPodpowiedz(true); 
    }
    
  return (
    
    <div className="App">
        <ToastContainer />
        <Navbar/> 
      <div className='zgadnijDruzyne'>
        <input
        placeholder='Nazwa drużyny...'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <br></br>
      <br></br>
      <button className='btn btn-outline-primary' onClick={() => {
        toast.warning(`Nie udało ci się zgadnąć, drużyna to: ${druzyna}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });  
        losowanie();
        setProby([]);
        setPodpowiedz(false);
        setInputValue('');
      }}>Poddajesz sie?</button>
      <br></br>
      <br></br>
      {inputValue.length > 0 && (
      <ul>
        {filteredTeamsData.map((team, index) => (
  <span key={index}>
    <br />

    {!proby.some((element) => element.teamName === team.teamName) && (
      <>
        <button className='btn btn-outline-primary' onClick={() => onclick(team.teamName, team.badge)}>{team.teamName}</button>
        <img src={team.badge}/>
        <br />
      </>
    )}
  </span>
))}
  </ul>
  )}
  <p>Twoje próby zgadnięcia: </p>
      {proby.map((proba, index) => (
        <span key={index}>
          <p key={index}>{index+1}. {proba.teamName}</p>
          <img src={proba.teamBadge}/>
          </span>
        ))}
        {podpowiedz && <p>Podpowiedź: {nazwaLigi}</p>}
      </div>
    </div>
  );
}

export default ZgadnijDruzyne;
