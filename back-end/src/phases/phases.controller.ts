import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhaseModel } from './entities/phase.model';
import { QueryPhaseDto } from './dto/phases-query.dto';
import { PhaseStatusEnum } from './enum/phases.enum';

@ApiTags('Phases')
@Controller('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @ApiResponse({
    description: 'For create a new Phase.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/')
  async createPhase(@Body() body: CreatePhaseDto): Promise<PhaseModel | Error> {
    return this.phasesService.createPhase(body);
  }

  @Get()
  async findAllPhases(
    // query: QueryPhaseDto,
    @Query() query: string,
  ): Promise<PhaseModel[] | Error> {
    return await this.phasesService.getPhases(query);
  }
}
