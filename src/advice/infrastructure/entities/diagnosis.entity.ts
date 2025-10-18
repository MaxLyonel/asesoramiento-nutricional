import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./patient.entity";
import { Diagnosis } from "src/advice/domain/entities/diagnosis.entity";

@Entity({ name: 'diagnostico' })
export class DiagnosisEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'peso', type: 'decimal'})
  weight: number;

  @Column({name: 'tamanio', type: 'decimal'})
  height: number;

  @Column({ name: 'composicion_corporal'})
  bodyComposition: string;

  // Relación inversa
  @OneToOne(() => PatientEntity, patient => patient.diagnosis)
  patient: PatientEntity;

   static fromDomain(diagnosis: Diagnosis): DiagnosisEntity {
    const entity = new DiagnosisEntity();
    entity.id = parseInt(diagnosis['id']);
    entity.weight = diagnosis['weight']?.getValue() ?? 0;
    entity.height = diagnosis['height']?.getValue() ?? 0;
    entity.bodyComposition = diagnosis['bodyComposition']?.getValue() ?? '';
    // entity.observations = diagnosis['observations'] ?? null;
    return entity;
  }
}
