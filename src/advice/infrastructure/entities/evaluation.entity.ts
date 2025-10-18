import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./patient.entity";
import { NutritionistEntity } from "./nutritionist.entity";
import { Evaluation } from "src/advice/domain/entities/evaluation.entity";
import { Weight } from "src/advice/domain/value-objects/weight.vo";
import { Height } from "src/advice/domain/value-objects/height.vo";
import { BodyComposition } from "src/advice/domain/value-objects/body-composition.vo";

@Entity({ name: 'evaluacion' })
export class EvaluationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'fecha', type: 'date'})
  date: Date;

  @Column({name: 'peso', type: 'decimal'})
  weight: number;

  @Column({name: 'tamanio', type: 'decimal'})
  height: number;

  @Column({name: 'composicion_corporal'})
  bodyComposition: string;

  // @Column({name: 'nutricionista_id'})
  // nutritionistId: number;
  @ManyToOne(() => NutritionistEntity, nutritionist => nutritionist.evaluations)
  nutritionist: NutritionistEntity;

  @Column({ nullable: true })
  observations?: string;

  // Relación inversa
  @ManyToOne(() => PatientEntity, patient => patient.evaluations)
  patient: PatientEntity;

  static toDomain(entity: EvaluationEntity): Evaluation {
    const evaluation = new Evaluation(
      entity.id+'',
      entity.date,
      new Weight(entity.weight),
      new Height(entity.height),
      new BodyComposition(entity.bodyComposition),
      entity.nutritionist?.id // o pasas el objeto completo si tu dominio requiere Nutritionist
    );

    // Observaciones opcionales
    if (entity.observations) {
      // evaluation.setObservations(entity.observations);
    }

    return evaluation;
  }

static fromDomain(evaluation: Evaluation): EvaluationEntity {
  const entity = new EvaluationEntity();
  entity.id = parseInt(evaluation['id']); // si id es string, si no puedes omitir
  entity.date = new Date(evaluation['date']); // asegúrate de convertir a Date
  entity.weight = evaluation['weight'].getValue(); // Extraer valor del Value Object
  entity.height = evaluation['height'].getValue();
  entity.bodyComposition = evaluation['bodyComposition'].getValue();
  entity.observations = evaluation['observations'];
  // Aquí relaciona nutricionista si tienes
  // entity.nutritionistId = evaluation['nutritionistId'];
  return entity;
}

}
