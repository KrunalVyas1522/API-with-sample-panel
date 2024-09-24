import { Module } from "@nestjs/common";
import { DatabaseProvider } from "./config/database-provider";

@Module({
    imports: [DatabaseProvider],
    exports: [DatabaseProvider]
})
export class DatabaseModule {};