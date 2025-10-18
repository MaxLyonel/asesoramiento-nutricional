import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EvaluationEntity } from "./evaluation.entity";

@Entity({ name: 'nutricionista' })
export class NutritionistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'nombre'})
  fullName: string;

  @Column({name: 'especialidad'})
  specialization: string;

  @OneToMany(() => EvaluationEntity, evalEntity => evalEntity.nutritionist)
  evaluations: EvaluationEntity[];
}