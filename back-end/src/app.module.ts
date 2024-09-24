import { Module } from '@nestjs/common';
import { PhasesModule } from './phases/phases.module';
import { LoggerModule } from './utils/logger/logger.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    PhasesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
