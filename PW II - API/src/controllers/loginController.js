import express, { response } from "express";
import userEntity from "../entities/User.js";
import { AppDataSource } from "../database/data-source.js";
import { generateToken } from "../utils/jwt.js";
import { generateNewPassword } from "../utils/login.js";
import { sendEmail } from "../helpers/nodeMailer.js";
import { IsNull } from "typeorm";

const route = express.Router();

const userRepository = AppDataSource.getRepository(userEntity);

route.post("/", async (request, response) => {
    const { email, password } = request.body;

    try{
        const user = await userRepository.findOne({where:{email}});
        const senha = await userRepository.findOne({where:{password}});

        if(!user || !senha){
        return response.status(401).send({ "response": `Email ou senha invalidos` });
        } 
        
        const token = generateToken({user:user.name, email:user.email, typeUser:user.typeUser})
        return response.status(200).send({ "response": `Login realizado com sucesso`, token });
    }catch(error){
        return response.status(500).send({ "response": `not find ${error}`});
    }

});

route.put("/reset", async (request, response) => {
    const {email} = request.body;

    const user = await userRepository.findOneBy({email, deletedAt: IsNull()});

    if(!user){
        return response.status(400).send({"response": "Email invalido."});
    }

    const newPassword = generateNewPassword();

    await userRepository.update({email}, {password: newPassword});

    sendEmail(newPassword, user.email);

    return response.status(200).send({"response":"Senha enviada para o email cadastrado."});
});

export default route;