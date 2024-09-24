import { env } from "../../env";
import { DataSource } from "typeorm";

export default new DataSource({
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER_NAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    type: 'postgres',
    entities: [`${__dirname}/../../**/entities/*.model.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*.{js,ts}`],
    synchronize: false,
    dropSchema: false
})