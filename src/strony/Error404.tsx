import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../komponenty/Navbar";
import goat from "../img/goat.jpeg"


function Error404() {
  return (
    <div className="App">
      <Navbar/>
      <div className='container'>
        <h1>Nie znaleziono strony!</h1>
        <h4>404</h4>
        <img src={goat} alt="goat" />
      </div>
    </div>
  );
}

export default Error404;
