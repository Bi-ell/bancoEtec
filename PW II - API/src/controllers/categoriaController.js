import express from "express";
import categoriaEntity from "../entities/Category.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();

const categoriaRepository = AppDataSource.getRepository(categoriaEntity);


route.post("/", async (request, response) => {
    const {name} = request.body;

    if(name.length < 2){
        return response.status(400).send(`O nome precisa ter no mínimo 2 letras.`);
    }

    if(!name){
        return response.status(400).send(`O nome não pode ser nulo ou vázio.`);
    }    

    const newCategoria = categoriaRepository.create({name});

    try{
        await categoriaRepository.save(newCategoria);
        return response.status(201).send({"response": `A categoria ${name} foi registrada`});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.get("/", async (request, response) => {
    try{
        const categorias = await categoriaRepository.find();
        return response.status(200).send({"response": categorias});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.get("/:name", async (request, response) => {
    try{
        const {name} = request.params;
        const categoria = await categoriaRepository.findBy({name: Like(`%${name}%`)});
        return response.status(200).send({"response": categoria});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.put("/", async (request, response) => {

    const {id, name} = request.body;

    if(name.length < 2){
        return response.status(400).send(`O nome precisa ter no mínimo 2 letras.`);
    }

    if(!name){
        return response.status(400).send(`O nome não pode ser nulo ou vázio.`);
    }

    try{
        await categoriaRepository.update(id, {name});
        return response.status(200).send({"response": `Dados atualizados com sucesso`});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.delete("/:idCategoria", async (request, response) => {
    const {idCategoria} = request.params; 

    //HARD DELETE
    // await categoriaRepository.delete({id: idCategoria});

    //SOFT DELETE
    await categoriaRepository.update({id: idCategoria}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    

    return response.status(200).send({"response": "Categoria excluida com sucesso"});

});

export default route;