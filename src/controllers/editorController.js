import express from "express";
import editorEntity from "../entities/Editor.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();

const editorRepository = AppDataSource.getRepository(editorEntity);


route.post("/", async (request, response) => {
    const {name, cnpj, email} = request.body;

    if(name.length < 2){
        return response.status(400).send(`O nome precisa ter no mínimo 2 letras.`);
    }

    if(!name){
        return response.status(400).send(`O nome não pode ser nulo ou vázio.`);
    }

    if(!cnpj){
        return response.status(400).send(`A cnpj não pode ser nulo ou vázio.`);
    }

    if(!email){
        return response.status(400).send(`O email não pode ser nulo ou vázio.`);
    }

    if(!email.includes('@')){
        return response.status(400).send(`O formato de email está invalido`);
    }

    

    const newEditor = editorRepository.create({name, cnpj, email});

    try{
        await editorRepository.save(newEditor);
        return response.status(201).send({"response": `O editor ${name} foi registrado`});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.get("/", async (request, response) => {
    try{
        const editores = await editorRepository.find();
        return response.status(200).send({"response": editores});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.get("/:name", async (request, response) => {
    try{
        const {name} = request.params;
        const editor = await editorRepository.findBy({name: Like(`%${name}%`)});
        return response.status(200).send({"response": editor});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.put("/", async (request, response) => {

    const {id, name, cnpj, email} = request.body;

    if(name.length < 2){
        return response.status(400).send(`O nome precisa ter no mínimo 2 letras.`);
    }

    if(!name){
        return response.status(400).send(`O nome não pode ser nulo ou vázio.`);
    }

    if(!cnpj){
        return response.status(400).send(`A cnpj não pode ser nulo ou vázio.`);
    }

    if(!email){
        return response.status(400).send(`O email não pode ser nulo ou vázio.`);
    }

    if(!email.includes('@')){
        return response.status(400).send(`O formato de email está invalido`);
    }

    try{
        await editorRepository.update(id, {name, cnpj, email});
        return response.status(200).send({"response": `Dados atualizados com sucesso`});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.delete("/:idEditor", async (request, response) => {
    const {idEditor} = request.params; 

    //HARD DELETE
    // await editorRepository.delete({id: idEditor});

    //SOFT DELETE
    await editorRepository.update({id: idEditor}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    

    return response.status(200).send({"response": "Editor excluido com sucesso"});

});

export default route;