import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Madryt from './strony/Madryt';
import Glowna from './strony/Glowna';
import Gracz from './strony/Gracz';
import Przewidywanie from './strony/Przewidywanie';
import Tabela from './strony/Tabela';
import Real_v_Barcelona from './strony/Real_v_Barcelona';
import Error404 from './strony/Error404';
import Aktualne from './strony/Aktualne';
import ZgadnijDruzyne from './strony/ZgadnijDruzyne';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Glowna />} />
          <Route path="madryt" element={<Madryt />} />
          <Route path="gracz" element={<Gracz />} />
          <Route path="przewidywanie" element={<Przewidywanie />} />
          <Route path="tabela" element={<Tabela />} />
          <Route path="real-vs-barcelona" element={<Real_v_Barcelona />} />
          <Route path="aktualne" element={<Aktualne />} />
          <Route path="zgadnij-druzyne" element={<ZgadnijDruzyne />} />
          <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
