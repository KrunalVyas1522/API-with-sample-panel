import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { PhaseStatusEnum, Translation } from "../enum/phases.enum";

export class CreatePhaseDto {
    @ApiProperty({ name: 'phase' })
    phase: string;
    
    @IsString()
    @ApiProperty({ name: 'status', enum: PhaseStatusEnum, example: PhaseStatusEnum.Active, required: true,
        description: `Should be in ${[PhaseStatusEnum.Active, PhaseStatusEnum.Deleted, PhaseStatusEnum.Pending, PhaseStatusEnum.Spam]}` 
    })
    status: PhaseStatusEnum;
    
    @ApiProperty({ name: 'translations' })
    translations: Translation;      
}
