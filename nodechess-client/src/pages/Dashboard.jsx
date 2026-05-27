import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [menu, setMenu] = useState("home");
  const [showPublic, setShowPublic] = useState(false);

  /* =========================
     🔥 STATE DATA DINAMIS
  ========================== */

  const [matchHistory] = useState([
    {
      opponent: "DarkKnight",
      result: "WIN"
    },
    {
      opponent: "AlphaZero",
      result: "LOSE"
    }
  ]);

  const [friends] = useState([
    { name: "PlayerAlpha", rank: 1200 },
    { name: "DarkKnight", rank: 1500 }
  ]);

  const [publicPlayers] = useState([
    { name: "Magnus", rank: 2000 },
    { name: "Hikaru", rank: 2100 }
  ]);

  const [rooms] = useState([
    { name: "Room Alpha", player: "1/2" },
    { name: "Room DarkKnight", player: "1/2" }
  ]);

  /* ========================= */

  return (

    <div className="dashboard-container">

      {/* SIDEBAR */}
      <div className="sidebar">

        <h1 className="logo">NODECHESS</h1>

        <ul>

          <li onClick={() => setMenu("home")}>Home</li>
          <li onClick={() => setMenu("friend")}>Friend</li>
          <li onClick={() => setMenu("room")}>Room</li>

          <li onClick={() => {
            localStorage.clear();
            navigate("/");
          }}>
            Logout
          </li>

        </ul>

      </div>

      {/* CONTENT */}
      <div className="dashboard-content">

        {/* ================= HOME ================= */}
        {menu === "home" && (

          <div>

            {/* PROFILE (DINAMIS) */}
            <div className="profile-card">

              <div className="profile-icon">
                {user?.username?.charAt(0) || "?"}
              </div>

              <div>

                <h2>{user?.username || "Guest"}</h2>
                <p>Rank: {user?.rating ?? 1200}</p>
                <p>Total Match: {user?.totalMatch ?? 0}</p>

              </div>

            </div>

            {/* HOME BOX */}
            <div className="home-box">

              <h1>NODECHESS</h1>
              <p>Welcome To Modern Chess Arena</p>

              <button
                className="play-btn"
                onClick={() => navigate("/game")}
              >
                PLAY NOW
              </button>

            </div>

            {/* HISTORY DINAMIS */}
            <h2 className="history-title">
              Match History
            </h2>

            {matchHistory.map((m, i) => (

              <div className="history-card" key={i}>

                <div>

                  <h3>
                    {user?.username} vs {m.opponent}
                  </h3>

                  <p>{m.result}</p>

                </div>

                <button onClick={() => navigate("/game")}>
                  PLAY
                </button>

              </div>

            ))}

          </div>

        )}

        {/* ================= FRIEND ================= */}
        {menu === "friend" && (

          <div>

            <div className="friend-header">

              <h1>FRIEND LIST</h1>

              <button
                className="add-friend-btn"
                onClick={() => setShowPublic(!showPublic)}
              >
                ADD FRIEND
              </button>

            </div>

            <input
              className="search-input"
              placeholder="Search Friend..."
            />

            {/* FRIEND LIST */}
            {!showPublic ? (

              friends.map((f, i) => (

                <div className="friend-card" key={i}>

                  <div>
                    <h3>{f.name}</h3>
                    <p>Rank: {f.rank}</p>
                  </div>

                  <button>INVITE</button>

                </div>

              ))

            ) : (

              publicPlayers.map((p, i) => (

                <div className="friend-card" key={i}>

                  <div>
                    <h3>{p.name}</h3>
                    <p>Rank: {p.rank}</p>
                  </div>

                  <button>ADD</button>

                </div>

              ))

            )}

          </div>

        )}

        {/* ================= ROOM ================= */}
        {menu === "room" && (

          <div>

            <h1>GAME ROOM</h1>

            <div className="room-card">

              <div>
                <h3>Quick Match</h3>
                <p>Play Automatically</p>
              </div>

              <button onClick={() => navigate("/game")}>
                PLAY
              </button>

            </div>

            <div className="room-card">

              <div>
                <h3>Create Room</h3>
                <p>Make Private Match</p>
              </div>

              <button onClick={() => navigate("/game")}>
                CREATE
              </button>

            </div>

            <div className="room-card">

              <div>
                <h3>Failed Match</h3>
                <p>View Match Problem</p>
              </div>

              <button>
                VIEW
              </button>

            </div>

            <h2 className="history-title">
              Public Rooms
            </h2>

            {rooms.map((r, i) => (

              <div className="friend-card" key={i}>

                <div>
                  <h3>{r.name}</h3>
                  <p>Player: {r.player}</p>
                </div>

                <button onClick={() => navigate("/game")}>
                  JOIN
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Dashboard;