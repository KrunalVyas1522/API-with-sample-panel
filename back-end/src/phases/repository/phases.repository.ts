import { Injectable } from "@nestjs/common";
import { PhaseModel } from "../entities/phase.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryPhaseDto } from "../dto/phases-query.dto";

export interface IPhaseRepository {
    savePhase(phase: PhaseModel): Promise<PhaseModel>;
    getAllPhases(query: string): Promise<PhaseModel[]>;
}

@Injectable()
export class PhaseRepository implements IPhaseRepository{
    
    constructor(
        @InjectRepository(PhaseModel)
        private readonly phaseRepository: Repository<PhaseModel>
    ){}

    public async savePhase(phase: PhaseModel): Promise<PhaseModel> {
        return await this.phaseRepository.save(phase);
    }

    public async getAllPhases(query: any): Promise<PhaseModel[]> {
        let queryable = await this.phaseRepository.createQueryBuilder('phases');
    
        // Check if the query is not empty
        if (query && query?.query) {
            // Searching for phrases using ILIKE
            queryable = queryable.where('phases.phrase ILIKE :phase', {
                phase: `%${query?.query}%`,
            });
    
            // Additionally searching within translations
            queryable = queryable.orWhere('phases.translations::text ILIKE :translations', {
                translations: `%${query.query}%`
            });

            console.log('CurrentQuery : ======> ', queryable.getQueryAndParameters());
        }
    
        return await queryable.getMany();
    }
}