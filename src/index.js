import express, { request } from 'express';
import { AppDataSource } from './database/data-source.js'; 
import routes from './routes.js';

const server = express();

server.use(express.json());

server.use("/", routes);

AppDataSource.initialize().then(async() => {
    console.log("Banco de dados conectado!")

        server.listen(3333,() =>{
        console.log("Server is running🚀")
    });
});
