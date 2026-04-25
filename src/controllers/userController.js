import express from "express";
import userEntity from "../entities/User.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();

const userRepository = AppDataSource.getRepository(userEntity);

route.post("/", async (request, response) => {
    const {name, email, password, typeUser} = request.body;

    if(name.length < 2){
        return response.status(400).send({"response": "O nome precisa ter no mínimo 2 letras."});
    }

    if(!name){
        return response.status(400).send({"response": "O nome não pode ser nulo ou vázio."});
    }

    if(!email){
        return response.status(400).send({"response": "O email não pode ser nulo ou vázio."});
    }

    if(!email.includes('@')){
        return response.status(400).send({"response": "O formato de email está invalido"});
    }

    if(password.length < 6 || password.length > 10){
        return response.status(400).send({"response": "A senha precisa ter mais de 6 e menos que 10 caracteres."});
    }

    if(typeUser.toUpperCase() != "ADMIN" && typeUser.toUpperCase() != "COMUM"){
        return response.status(400).send({"response": `O tipo de usuário tem que ser "admin" ou "comum".`});
    }

    if(!typeUser){
        return response.status(400).send({"response":`O tipo de usuário deve ser usuario.`});
    }

    const newUser = userRepository.create({name, email, password, typeUser});

    try{
        await userRepository.save(newUser);
        return response.status(201).send({"response": `O nome de usuário ${name} foi registrado`});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.get("/", async (request, response) => {
    try{
        const users = await userRepository.find();
        return response.status(200).send({"response": users});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.get("/:name", async (request, response) => {
    try{
        const {name} = request.params;
        const user = await userRepository.findBy({name: Like(`%${name}%`)});
        return response.status(200).send({"response": user});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.put("/", async (request, response) => {

    const {id, name, email, password, typeUser} = request.body;

    if(name.length < 2){
        return response.status(400).send({"response": "O nome precisa ter no mínimo 2 letras."});
    }

    if(!email){
        return response.status(400).send({"response": "O email não pode ser nulo ou vázio."});
    }

    if(!email.includes('@')){
        return response.status(400).send({"response": "O formato de email está invalido"});
    }

    if(password.length < 6 || password.length > 10){
        return response.status(400).send({"response": "A senha precisa ter mais de 6 e menos que 10 caracteres."});
    }

    if(typeUser.toUpperCase() != "ADMIN" && typeUser.toUpperCase() != "COMUM"){
        return response.status(400).send({"response": `O tipo de usuário tem que ser "admin" ou "comum".`});
    }

    if(!typeUser){
        return response.status(400).send({"response":`O tipo de usuário deve ser usuario.`});
    }

    try{
        await userRepository.update(id, {name, email, password, typeUser});
        return response.status(200).send({"response": `Dados atualizados com sucesso`});
    }catch(error){
        return response.status(500).send({"response": `not find ${error}`});
    }
});

route.delete("/:idUser", async (request, response) => {
    const {idUser} = request.params; 

    //HARD DELETE
    // await userRepository.delete({id: idUser});

    //SOFT DELETE
    await userRepository.update({id: idUser}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    

    return response.status(200).send({"response": "Usuário excluido com sucesso"});

});

export default route;