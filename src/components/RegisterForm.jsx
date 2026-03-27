import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import logo from "../assets/Etec.png";
import api from "../services/api";
import { toast } from "react-toastify";

function RegisterForm() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [typeUser, setTypeUser] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post("/user", {
                email, password, name, typeUser
            });

            toast.success(response.data.response, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setEmail("");
            setName("");
            setPassword("");
            setTypeUser("");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="login-box" onSubmit={onSubmit}>

            <img src={logo} alt="Logo" className="logo" />

            <h2>Cadastro</h2>

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

                <Input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <select className="select"
                    required
                    value={typeUser}
                    onChange={(e) => setTypeUser(e.target.value)}
                >
                    <option value="">Selecione o perfil</option>
                    <option value="COMUM">Comum</option>
                    <option value="ADMIN">Administrador</option>
                </select>

                <Button type="submit">
                    Criar conta
                </Button>
            </form>

            <p>
                Já tem conta? <Link to="/">Fazer login</Link>
            </p>
        </div>
    );
}

export default RegisterForm;