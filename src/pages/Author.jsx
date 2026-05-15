import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Author.css";

function Author() {

    const Navigate = useNavigate();

    const [authors, setAuthors] = useState([]);

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [selectedAuthor, setSelectedAuthor] = useState('');

    const [authorName, setAuthorName] = useState('');
    const [authorNacionality, setAuthorNacionality] = useState('');
    const [authorBirthdate, setAuthorBirthdate] = useState('');


    const handleShowEdit = (item) => {
        setShowDelete(false);
        setShowEdit(true);
        setSelectedAuthor(item);
        setAuthorName(item.name);
        setAuthorNacionality(item.nacionality);
        setAuthorBirthdate(item.birthdate);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
    };

    const handleShowDelete = (item) => {
        setShowEdit(false);
        setShowDelete(true);
        setSelectedAuthor(item);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
    };

    async function handleDeleteAuthor() {
        api.delete(`/autor/${selectedAuthor.id}`);
        setShowDelete(false);
        const { data } = await api.get('/autor');
        setAuthors(data.response || []);
    };

    async function handleSaveAutor() {
        const body = {
            "name": authorName,
            "birthdate": authorBirthdate,
            "nacionality": authorNacionality
        }
    }

    useEffect(() => {
        async function getData() {
            const { data } = await api.get('/autor');
            setAuthors(data.response || []);
        }
        getData();
    }, []);

    return (
        <div className="container-autor">
            <div className='autor'>
                <div className="linha-titulo">
                    <h1>Dados de Autor</h1>
                    <button >Cadastrar Autor</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Nacionalidade</th>
                            <th>Data de Nascimento</th>
                            <th>Ação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            authors.map((author, index) => (
                                <tr key={index}>
                                    <td>{author.id}</td>
                                    <td>{author.name}</td>
                                    <td>{author.nacionality}</td>
                                    <td>{new Date(author.birthdate).toLocaleDateString("pt-BR")}</td>
                                    <td>
                                        <button onClick={() => handleShowEdit(author)}>Editar</button>
                                        <button onClick={() => handleShowDelete(author)}>Excluir</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {showEdit && (
                <>
                    <div className="overlay"></div>
                    <div className="modal-action">
                        <div>
                            {
                                selectedAuthor ? <div>Atualizar Autor</div> : <div>Cadastrar Autor</div>
                            }
                        </div>
                        <div>
                            {
                                selectedAuthor ? <p>Quais dados quer atualizar?</p> : <p>Quais são as novas informações do novo autor</p>
                            }

                            <div className="form-edit-actor">
                                <p>
                                    Nome: <input
                                        value={authorName}
                                        type="text"
                                        placeholder="Nome do autor"
                                        onChange={(e) => setAuthorName(e.target.value)}>
                                    </input>
                                </p>
                                <p>
                                    Nacionalidade: <input value={authorNacionality}
                                        type="text"
                                        placeholder="Nacionalidade"
                                        onChange={(e) => setAuthorNacionality(e.target.value)}>
                                    </input>
                                </p>
                                <p>
                                    Nascimento:
                                    { 
                                    selectedAuthor ?
                                        <input value={new Date(authorBirthdate).toLocaleDateString("pt-BR")}
                                            type="text" placeholder="xx/xx/xxxx"
                                            onChange={(e) => setAuthorBirthdate(e.target.value)}>
                                        </input> :
                                        <input value={authorBirthdate}
                                            type="text" 
                                            placeholder="xx/xx/xxxx"
                                            onChange={(e) => setAuthorBirthdate(e.target.value)}>
                                        </input> 
                                    }
                                </p>
                            </div>
                        </div>
                        <div>
                            <button>
                                Salvar
                            </button>
                            <button onClick={handleCloseEdit}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </>
            )}

            {showDelete && (
                <>
                    <div className="overlay"></div>
                    <div className="modal-action">
                        <div>
                            <div>Excluir</div>
                        </div>
                        <div>Deseja mesmo excluir o autor?</div>
                        <div>
                            <button onClick={handleDeleteAuthor}>
                                Excluir
                            </button>
                            <button onClick={handleCloseDelete}>
                                cancelar
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Author;