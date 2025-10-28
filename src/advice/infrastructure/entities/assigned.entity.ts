import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./patient.entity";
import { NutritionistEntity } from "./nutritionist.entity";


@Entity({ name: 'asignacion'})
export class PatientAssignmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PatientEntity, (patient) => patient.assignments, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'paciente_id'})
  patient: PatientEntity;

  @ManyToOne(() => NutritionistEntity, (nutritionist) => nutritionist.assignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nutricionista_id'})
  nutritionist: NutritionistEntity

  @Column({ type: 'varchar', length: 50})
  serviceType: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

}