import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/images/illustration.svg";
import logoimg from "../assets/images/logo.svg";

// Components
import Button from "../components/Button";
// CSS

import "../styles/auth.scss";

export default function NewRoom() {
  const { user, SignInWithGoogle } = useAuth();
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
          <form>
            <input type="text" placeholder="Nome da sala" />
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
