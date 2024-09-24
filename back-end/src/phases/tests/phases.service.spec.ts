import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CreatePhaseDto } from '../dto/create-phase.dto';
import { PhaseModel } from '../entities/phase.model';
import { PhasesService } from '../phases.service';
import { PhaseRepository } from '../repository/phases.repository';
import { PhaseStatusEnum } from '../enum/phases.enum';
import { SaveOptions, RemoveOptions } from 'typeorm';

describe('PhasesService', () => {
  let service: PhasesService;
  let mockPhaseRepository: Partial<PhaseRepository>;

  beforeEach(async () => {
    mockPhaseRepository = {
      savePhase: jest.fn(),
      getAllPhases: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhasesService,
        {
          provide: PhaseRepository,
          useValue: mockPhaseRepository,
        },
      ],
    }).compile();

    service = module.get<PhasesService>(PhasesService);
  });

  const mockPhaseData: PhaseModel = {
      id: 1,
      phrase: "Hi, I'm a phrase",
      status: PhaseStatusEnum.Active,
      createdAt: new Date(),
      updatedAt: new Date(),
      translations: {
          fr: "Salut, je suis une phrase",
          es: "hola soy una frase"
      },
      hasId: function (): boolean {
          throw new Error('Function not implemented.');
      },
      save: function (options?: SaveOptions): Promise<PhaseModel> {
          throw new Error('Function not implemented.');
      },
      remove: function (options?: RemoveOptions): Promise<PhaseModel> {
          throw new Error('Function not implemented.');
      },
      softRemove: function (options?: SaveOptions): Promise<PhaseModel> {
          throw new Error('Function not implemented.');
      },
      recover: function (options?: SaveOptions): Promise<PhaseModel> {
          throw new Error('Function not implemented.');
      },
      reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
      }
  };

  describe('createPhase', () => {
    it('should create a new phase and return it for create scenario.', async () => {
      const createPhaseDto: CreatePhaseDto = {
        phase: "Hi, I'm a phrase",
        status: PhaseStatusEnum.Active,
        translations: {
            fr: "Salut, je suis une phrase",
            es: "hola soy una frase"
        },
      };

     
      mockPhaseRepository.savePhase = jest.fn().mockResolvedValue(mockPhaseData);

      const result = await service.createPhase(createPhaseDto);
      expect(result).toEqual(mockPhaseData);
      expect(result).toBeInstanceOf(PhaseModel);
    });

    it('should throw an error if phase creation fails', async () => {
      const createPhaseDto: CreatePhaseDto = {
        phase: 'New Phase',
        status: PhaseStatusEnum.Active,
        translations: {
            fr: "Salut, je suis une phrase",
            es: "hola soy una frase"
        },
      };

      mockPhaseRepository.savePhase = jest.fn().mockRejectedValue(new Error('Database Error'));

      await expect(service.createPhase(createPhaseDto)).rejects.toThrow(Error);
    });
  });

  describe('getPhases', () => {
    
    it('should return phases for a given query', async () => {
      const query = 'active';
      
      const mockPhases: PhaseModel[] = [{
        id: 1, phrase: 'Test', status: PhaseStatusEnum.Active,
        translations: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        hasId: function (): boolean {
            throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<PhaseModel> {
            throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<PhaseModel> {
            throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<PhaseModel> {
            throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<PhaseModel> {
            throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
            throw new Error('Function not implemented.');
        }
    }];
      mockPhaseRepository.getAllPhases = jest.fn().mockResolvedValue(mockPhases);

      const result = await service.getPhases(query);
      expect(result).toEqual(mockPhases);
      expect(mockPhaseRepository.getAllPhases).toHaveBeenCalledWith(query);
    });

    it('should throw NotFoundException if no phases are found', async () => {
      const query = 'inactive';
      mockPhaseRepository.getAllPhases = jest.fn().mockResolvedValue([]);

      await expect(service.getPhases(query)).rejects.toThrow(NotFoundException);
      expect(mockPhaseRepository.getAllPhases).toHaveBeenCalledWith(query);
    });

    it('should throw an error if the repository fails', async () => {
      const query = 'phase-01';
      mockPhaseRepository.getAllPhases = jest.fn().mockRejectedValue(new Error('Database Error'));

      await expect(service.getPhases(query)).rejects.toThrow(Error);
      expect(mockPhaseRepository.getAllPhases).toHaveBeenCalledWith(query);
    });
  });
});
