import '../App.css';
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbar_komponent() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" bg="primary" sticky='top' >
        <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Główna</Nav.Link>
            <Nav.Link href="/aktualne">Aktualne mecze</Nav.Link>
            <Nav.Link href="/gracz">Informacje o graczu</Nav.Link>
            <Nav.Link href="/madryt">Informacje o Realu Madryt</Nav.Link>
            <Nav.Link href="/zgadnij-druzyne">Zgadnij drużynę</Nav.Link>
            <Nav.Link href="/przewidywanie">Przewidywania meczów</Nav.Link>
            <Nav.Link href="/real-vs-barcelona">Real vs Barcelona H2H</Nav.Link>
            <Nav.Link href="/tabela">Tabela</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br></br>
    </>
  );
}

export default Navbar_komponent;
