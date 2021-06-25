import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logoimg from "../assets/images/logo.svg";
import googleimg from "../assets/images/google-icon.svg";
import login1 from "../assets/images/log-in 1.svg";

import { database } from "../services/firebase";

// Components
import Button from "../components/Button";

// CSS
import "../styles/auth.scss";

// Context
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const history = useHistory();
  const { user, SignInWithGoogle } = useAuth();
  const [roomcode, setroomcode] = useState("");
  // authentication
  const handleCreateRoom = async () => {
    if (!user) {
      await SignInWithGoogle();
    }
    history.push("/rooms/new");
  };

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (roomcode.trim() === "") {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomcode}`).get();

    if (!roomRef.exists()) {
      alert("This room does not exists");
      return;
    }
    history.push(`rooms/${roomcode}`);
  };
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustracao home" id="illustrationImg" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoimg} alt="Logo LetMeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleimg} alt="googleimg" id="googleIMG" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={(e) => setroomcode(e.target.value)}
              value={roomcode}
            />
            <Button type="submit">
              <img src={login1} id="login-icon" alt="login icon" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
