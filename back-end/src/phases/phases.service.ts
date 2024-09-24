import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePhaseDto } from './dto/create-phase.dto';
// import { LoggerService } from '../utils/logger/WinstonLogger';
import { IPhaseRepository, PhaseRepository } from './repository/phases.repository';
import { PhasesBuilder } from './builders/phases.builder';
import { PhaseModel } from './entities/phase.model';

@Injectable()
export class PhasesService {

  constructor(
    // private readonly logger: Logger,

    @Inject(PhaseRepository)
    public phaseRepository: IPhaseRepository,
  ) {}

  static logInfo = 'Service - phases:';
  
  async createPhase(data: CreatePhaseDto): Promise<PhaseModel | Error> {
    // this.logger.log(
    //   `${ PhasesService.logInfo} Create phase with name : ${data.phase}`,
    // );
    console.log(`${ PhasesService.logInfo} Create phase with name : ${data.phase}`);
    try {
      const phaseData = await PhasesBuilder.buildPhase(data); 
      const record = await this.phaseRepository.savePhase(phaseData);
      // this.logger.log(
      //   `${ PhasesService.logInfo} Created phase with following Data: ${data}`,
      // );
      console.log(`${ PhasesService.logInfo} Created phase with following Data: ${data}`);
      return record;
    } catch (error) {
      // this.logger.error(
      //   `${ PhasesService.logInfo} Error Occurred Due to: ${error}`,
      // );
      console.log(`${ PhasesService.logInfo} Error Occurred Due to: ${error}`);
        throw new Error(error);
      }
    }

    // public async getPhases (
    //   // query: QueryPhaseDto
    //   query: string
    // ): Promise<PhaseModel[] | Error> {
    //   // this.logger.info(
    //   //   `${PhasesService.logInfo} Getting Phases for data: ${query}`,
    //   // );
    //   console.log(`${PhasesService.logInfo} Getting Phases for data: ${query}`,);
    //   try {
    //     console.log('Current Query : =======> ', query);

    //     const phases = await this.phaseRepository.getAllPhases(
    //       query
    //     );
    //     if (!phases.length) {
    //       // this.logger.warn(
    //       //   `${PhasesService.logInfo} failed to find Phases for data: ${query}`,
    //       // );
    //       console.log(`${PhasesService.logInfo} failed to find Phases for data: ${query}`,);
    //       throw new NotFoundException();
    //     }
    //     // this.logger.info(
    //     //   `${PhasesService.logInfo} Found Phases with data: ${query}`,
    //     // );
    //     console.log(`${PhasesService.logInfo} Found Phases with data: ${query}`,);
    //     return  phases ;
    //   } catch (error) {
    //     // this.logger.error(
    //     //   `${PhasesService.logInfo} failed to find phases for data: ${query}`,
    //     //   error.stack,
    //     // );
    //     console.log(`${PhasesService.logInfo} failed to find phases for data: ${query}`,);
    //     throw new Error(error);
    //   }
    // }
    public async getPhases(query: string): Promise<PhaseModel[] | Error> {
      console.log(`${PhasesService.logInfo} Getting Phases for data: ${query}`);
      try {
        console.log('Current Query : =======> ', query);
    
        const phases = await this.phaseRepository.getAllPhases(query);
        if (!phases.length) {
          console.log(`${PhasesService.logInfo} failed to find Phases for data: ${query}`);
          throw new NotFoundException(`No phases found for query: ${query}`); // Change this line
        }
        console.log(`${PhasesService.logInfo} Found Phases with data: ${query}`);
        return phases;
      } catch (error) {
        console.log(`${PhasesService.logInfo} failed to find phases for data: ${query}`);
        throw new Error(error);
      }
    }
}
