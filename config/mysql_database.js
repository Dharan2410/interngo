import {Sequelize} from "sequelize"
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:'mysql',
    logging:console.log
});

sequelize.authenticate()
    .then(()=>console.log("connected successfully"))
    .catch((err)=>console.log("error occured :", err))

export default sequelize