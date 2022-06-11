import {app} from "./app.js";
import {config} from "dotenv";
import {connectDatabase} from './config/database.js'

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})


config({path: "./config/config.env"});
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
})

process.on('unhandleRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    
    server.close(() => {
        process.exit(1);
    })
});