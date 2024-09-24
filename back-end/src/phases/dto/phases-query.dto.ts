import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class QueryPhaseDto {
    @ApiPropertyOptional({ name: 'phase' })
    phase: string;
    
    @ApiPropertyOptional({ name: 'status' })
    status: string; 
}