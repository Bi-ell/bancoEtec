import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import logo from "../assets/Etec.png";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleLogin() {
        alert("Login realizado");
    }

    return (
        <div className="login-box">

            <img src={logo} alt="Logo" className="logo" />

            <h2>Login</h2>

            <Input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <div className="options">
                <div className="checkbox">
                    <input className="caixinha" type="checkbox" id="manter" />
                    <label htmlFor="manter">Manter conectado</label>
                </div>

                <a href="#" className="forgot">
                    Esqueci minha senha
                </a>
            </div>
            
            <Button onClick={handleLogin}>
                Entrar
            </Button>

            <p>
                Não tem conta? <Link to="/register">Cadastre-se</Link>
            </p>

        </div>
    );
}

export default LoginForm;