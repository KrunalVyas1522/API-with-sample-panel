import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PhaseStatusEnum, Translation } from "../enum/phases.enum";

@Entity({
    name: 'phases',
    schema: 'public'
})
export class PhaseModel extends BaseEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    @Column({
        name: 'phrase',
        type: 'varchar'
    })
    phrase: string;

    @Column({
        name: 'status',
        type: 'varchar'
    })
    status: PhaseStatusEnum;

    @Column({
        name: 'translations',
        type: 'jsonb'
    })
    translations: Translation;

    @Column({
        name: 'created_at',
        type: 'date'
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'date',
        nullable: true
    })
    updatedAt: Date;

    
    constructor(
        phrase: string,
        status: PhaseStatusEnum,
        translations: Translation,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super();
        this.phrase = phrase;
        this.status = status;
        this.translations = translations;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
