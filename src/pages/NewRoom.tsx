import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoimg from "../assets/images/logo.svg";

// Components
import Button from "../components/Button";
// CSS

import "../styles/auth.scss";
import { database } from "../services/firebase";

export default function NewRoom() {
  const history = useHistory();
  const { user, SignInWithGoogle } = useAuth();
  const [newRoom, setnewRoom] = useState("");

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();

    // Verificar se existe algum texto
    if (newRoom.trim() === "") {
      return;
    }

    const roomReference = database.ref("rooms");
    const firebaseRoom = await roomReference.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(e) => setnewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala ja existente?{" "}
            <Link to="/">Clique aqui.</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
