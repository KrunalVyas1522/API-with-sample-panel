import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../utils/logger/logger.module';
import { PhaseModel } from './entities/phase.model';
import { PhasesController } from './phases.controller';
import { PhasesService } from './phases.service';
import { PhaseRepository } from './repository/phases.repository';
import { LoggerService } from 'src/utils/logger/winstonLogger';

@Module({
  imports: [
  TypeOrmModule.forFeature([PhaseModel]),
  // LoggerModule
  ],
  controllers: [PhasesController],
  providers: [
    PhasesService,
    PhaseRepository,
    // LoggerService
  ],
  exports: [
    PhasesService,
    PhaseRepository
  ],
})
export class PhasesModule {}
