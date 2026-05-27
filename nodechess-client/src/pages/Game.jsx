import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useState } from "react";

/* =========================
   🧠 GAME SERVICE
========================= */
function createGameService() {

  const game = new Chess();

  return {

    getFen: () => game.fen(),

    move: (move) => {
      return game.move(move);
    },

    reset: () => game.reset(),

    isGameOver: () => game.isGameOver(),

    turn: () => game.turn() // w / b

  };

}

/* =========================
   💬 CHAT SERVICE (LOCAL)
========================= */
function createChatService() {

  let messages = [];

  return {

    send: (msg, user) => {
      messages.push({ msg, user });
    },

    getAll: () => messages

  };

}

/* =========================
   🎮 MAIN GAME
========================= */
function Game() {

  const [service] = useState(createGameService());
  const [chatService] = useState(createChatService());

  const [fen, setFen] = useState(service.getFen());
  const [moves, setMoves] = useState([]);
  const [chat, setChat] = useState(chatService.getAll());
  const [input, setInput] = useState("");

  /* ================= MOVE ================= */
  function onDrop(sourceSquare, targetSquare) {

    const move = service.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q"
    });

    if (move) {

      setFen(service.getFen());

      setMoves(prev => [...prev, move.san]);

      return true;

    }

    return false;

  }

  /* ================= CHAT ================= */
  function sendChat() {

    if (!input) return;

    chatService.send(input, "You");

    setChat(chatService.getAll());

    setInput("");

  }

  return (

    <div className="game-container">

      {/* LEFT PANEL - MOVE */}
      <div className="move-panel">

        <h2>MOVES</h2>

        {moves.map((m, i) => (
          <div key={i}>
            {i + 1}. {m}
          </div>
        ))}

      </div>

      {/* CENTER - BOARD */}
      <div className="board-container">

        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardWidth={650}
        />

      </div>

      {/* RIGHT - CHAT */}
      <div className="chat-panel">

        <h2>CHAT</h2>

        <div className="chat-box">

          {chat.map((c, i) => (
            <p key={i}>
              {c.user}: {c.msg}
            </p>
          ))}

        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
        />

        <button onClick={sendChat}>
          SEND
        </button>

      </div>

    </div>

  );

}

export default Game;