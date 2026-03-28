import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../services/api";
import Input from "./Input";
import Button from "./Button";
import logo from "../assets/Etec.png";

function LoginForm() {

    const navigateTo = useNavigate();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();

        const { data } = await api.post("/login", { email, password });

        localStorage.setItem("token", data.token);

        setTimeout(() => {
            navigateTo("/home")
        }, 2000);

        setEmail("");
        setPassword("");
    }

    return (
        <div className="login-box" onSubmit={onSubmit}>

            <img src={logo} alt="Logo" className="logo" />

            <h2>Login</h2>
            <form className="form" >
                <Input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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

                <Button type="submit" >
                    Entrar
                </Button>
            </form>
            <p>
                Não tem conta? <Link to="/register">Cadastre-se</Link>
            </p>

        </div>
    );
}

export default LoginForm;