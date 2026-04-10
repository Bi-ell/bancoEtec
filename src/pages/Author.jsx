import { useEffect, useState } from 'react';
import api from '../services/api.js';
import NavBar from '../../Components/NavBar';
import "./author.css";

function Index() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getAuthor() {
            try {
                const response = await api.get("/author");
                setAuthors(response.data.response || []);
            } catch (error) {
                setError(`Erro ao carregar os dados de autor: ${error}`);
            } finally {
                setLoading(false);
            }
        }

        getAuthor();
    }, []);

    if (loading) return <h1>Carregando...</h1>
    if (error) return <h1>{error}</h1>
    
    return (
        <>
            <NavBar />

            <div>
                <h1>Dados de Autor</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Nacionalidade</th>
                            <th>Data de Nascimento</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            authors.map((author, index) => (
                                <tr key={index}>
                                    <td>{author.id}</td>
                                    <td>{author.name}</td>
                                    <td>{author.nationality}</td>
                                    <td>{new Date(author.birthdate).toLocaleDateString("pt-BR")}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Index