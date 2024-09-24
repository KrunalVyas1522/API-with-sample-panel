import { isEnum } from "class-validator";
import { CreatePhaseDto } from "../dto/create-phase.dto";
import { PhaseModel } from "../entities/phase.model";
import { PhaseStatusEnum } from "../enum/phases.enum";

export class PhasesBuilder {
    static async buildPhase(phase: CreatePhaseDto): Promise<PhaseModel> {
        // Check for required fields
        if (!phase.phase || !phase.translations || !phase.status) {
            throw new Error("Invalid phase data: phase, status, and translations are required.");
        }

        // Check if the status is valid
        if (!isEnum(phase.status, PhaseStatusEnum)) {
            throw new Error("Invalid phase status.");
        }

        // Create and return the PhaseModel
        return new PhaseModel(
            phase.phase,
            phase.status,
            phase.translations,
            new Date(),
            new Date()
        );
    }
}
