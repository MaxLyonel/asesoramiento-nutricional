import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./patient.entity";
import { Diagnosis } from "src/advice/domain/entities/diagnosis.entity";
import { Weight } from "src/advice/domain/value-objects/weight.vo";
import { Height } from "src/advice/domain/value-objects/height.vo";
import { BodyComposition } from "src/advice/domain/value-objects/body-composition.vo";

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

  static toDomain(entity: DiagnosisEntity): Diagnosis {
    return new Diagnosis(
      entity.id.toString(),                       // id como string si tu dominio lo espera así
      new Weight(Number(entity.weight)),          // convertir decimal a number
      new Height(Number(entity.height)),
      new BodyComposition(entity.bodyComposition)
    );
  }

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
