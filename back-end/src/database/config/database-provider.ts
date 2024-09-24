import { TypeOrmModule } from "@nestjs/typeorm";
import { env } from "../../env";

export const DatabaseProvider = TypeOrmModule.forRootAsync({
    useFactory : () =>({
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
})