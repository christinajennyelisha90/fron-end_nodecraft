import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";

import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <GameProvider>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game" element={<Game />} />

        </Routes>

      </BrowserRouter>

    </GameProvider>
  );
}

export default App;