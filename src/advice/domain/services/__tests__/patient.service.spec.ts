import { EvaluationDomainService } from '../patient.service';
import { Patient } from '../../entities/patient.entity';
import { Evaluation } from '../../entities/evaluation.entity';
import { Gender } from '../../value-objects/gender.vo';
import { IdentityCard } from '../../value-objects/identity-card.vo';
import { CellPhone } from '../../value-objects/cell-phone.vo';
import { Location } from '../../value-objects/location.vo';
import { Weight } from '../../value-objects/weight.vo';
import { Height } from '../../value-objects/height.vo';
import { BodyComposition } from '../../value-objects/body-composition.vo';

describe('EvaluationDomainService', () => {
  let patient: Patient;

  beforeEach(() => {
    patient = new Patient(
      1,
      'John',
      'Doe',
      new Gender('M'),
      new IdentityCard('12345678'),
      new CellPhone('0999999999'),
      new Location(-0.2, -78.5)
    );
  });

  describe('ensureNutritionistLimit', () => {
    it('should allow evaluation when nutritionist is under limit', () => {
      const allPatients = [patient];
      const date = new Date();
      const nutritionistId = 1;

      // no debería lanzar error
      expect(() => {
        EvaluationDomainService.ensureNutritionistLimit(
          nutritionistId,
          date,
          allPatients
        );
      }).not.toThrow();
    });

    it('should throw error when nutritionist exceeds daily limit', () => {
      const date = new Date('2025-12-20');
      const nutritionistId = 1;
      const allPatients: Patient[] = [];

      // agregar MAX_EVALUATIONS_PER_DAY (5) evaluaciones
      for (let i = 0; i < EvaluationDomainService.MAX_EVALUATIONS_PER_DAY; i++) {
        const evaluation = new Evaluation(
          i.toString(),
          date,
          new Weight(70),
          new Height(1.75),
          new BodyComposition('Normal'),
          nutritionistId
        );
        // Crear un nuevo paciente para cada evaluación para evitar el error de fecha duplicada
        const p = new Patient(
          100 + i,
          `Test${i}`,
          `Patient${i}`,
          new Gender('M'),
          new IdentityCard(`1234567${i}`),
          new CellPhone('0999999999'),
          new Location(-0.2, -78.5)
        );
        p.addEvaluation(evaluation);
        allPatients.push(p);
      }

      // la siguiente debería lanzar error
      expect(() => {
        EvaluationDomainService.ensureNutritionistLimit(
          nutritionistId,
          date,
          allPatients
        );
      }).toThrow(`El nutricionista ${nutritionistId} ya alcanzó el máximo de evaluaciones`);
    });
  });
});
