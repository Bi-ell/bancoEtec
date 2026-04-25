import express from "express";
import autorEntity from "../entities/Author.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();

const autorRepository = AppDataSource.getRepository(autorEntity);


route.post("/", async (request, response) => {
    const {name, birthdate, nacionality} = request.body;

    if(name.length < 2){
        return response.status(400).send(`O nome precisa ter no mínimo 2 letras.`);
    }

    if(!name){
        return response.status(400).send(`O nome não pode ser nulo ou vázio.`);
    }

    if(!birthdate){
        return response.status(400).send(`A data de nascimento não pode ser nulo ou vázio.`);
    }

    if(!nacionality){
        return response.status(400).send(`A nacionalidade não pode ser nulo ou vázio.`);
    }

    const newAutor = autorRepository.create({name, birthdate, nacionality});

    try{
        await autorRepository.save(newAutor);
        return response.status(201).send({"response": `O autor ${name} foi registrado`});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.get("/", async (request, response) => {
        const autors = await autorRepository.find();
        return response.status(200).send({"response": autors});
    
});

route.get("/:name", async (request, response) => {
    try{
        const {name} = request.params;
        const autor = await autorRepository.findBy({name: Like(`%${name}%`)});
        return response.status(200).send({"response": autor});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.put("/", async (request, response) => {

    const {id, name, birthdate, nacionality} = request.body;

    if(name.length < 2){
        return response.status(400).send(`O nome precisa ter no mínimo 2 letras.`);
    }

    if(!name){
        return response.status(400).send(`O nome não pode ser nulo ou vázio.`);
    }

    if(!birthdate){
        return response.status(400).send(`A data de nascimento não pode ser nulo ou vázio.`);
    }

    if(!nacionality){
        return response.status(400).send(`A nacionalidade não pode ser nulo ou vázio.`);
    }

    try{
        await autorRepository.update(id, {name, birthdate, nacionality});
        return response.status(200).send({"response": `Dados atualizados com sucesso`});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.delete("/:idAutor", async (request, response) => {
    const {idAutor} = request.params; 

    //HARD DELETE
    // await autorRepository.delete({id: idAutor});

    //SOFT DELETE
    await autorRepository.update({id: idAutor}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    

    return response.status(200).send({"response": "Autor excluido com sucesso"});

});

export default route;