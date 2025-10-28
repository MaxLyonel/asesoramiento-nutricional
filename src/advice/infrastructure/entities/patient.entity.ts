import { Gender } from '../../domain/value-objects/gender.vo';
import { IdentityCard } from '../../domain/value-objects/identity-card.vo';
import { CellPhone } from '../../domain/value-objects/cell-phone.vo';
import { Location } from '../../domain/value-objects/location.vo';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { DiagnosisEntity } from './diagnosis.entity';
import { EvaluationEntity } from './evaluation.entity';
import { PatientAssignmentEntity } from './assigned.entity';

@Entity({ name: 'paciente'})
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre'})
  fullName: string;

  @Column({ name: 'paterno'})
  lastName: string;

  @Column({ type: 'enum', enum: ['M', 'F']})
  gender: string;

  @Column({ name: 'carnet'})
  identityCard: string;

  @Column({ name: 'celular'})
  cellPhone: string;

  @Column({ name: 'latitud', type: 'decimal'})
  latitude: number;

  @Column({ name: 'longitud', type: 'decimal'})
  longitude: number;

  @OneToOne(() => DiagnosisEntity, diag => diag.patient, { cascade: true })
  @JoinColumn()
  diagnosis: DiagnosisEntity;

  @OneToMany(() => EvaluationEntity, evalEntity => evalEntity.patient, { cascade: true })
  evaluations: EvaluationEntity[]

  @OneToMany(() => PatientAssignmentEntity, (assignment) => assignment.patient)
  assignments: PatientAssignmentEntity[];

  // --- toDomain ---
  static toDomain(entity: PatientEntity): Patient {
    const patient = new Patient(
      entity.id,
      entity.fullName,
      entity.lastName,
      new Gender(entity.gender as 'M' | 'F'),
      new IdentityCard(entity.identityCard),
      new CellPhone(entity.cellPhone),
      new Location(entity.latitude, entity.longitude)
    );

    // Diagnóstico (si existe)
    if (entity.diagnosis) {
      patient.setInitialDiagnosis(DiagnosisEntity.toDomain(entity.diagnosis));
    }

    // Evaluaciones (si existen)
    if (entity.evaluations && entity.evaluations.length > 0) {
      const evaluations = entity.evaluations.map(e => EvaluationEntity.toDomain(e));
      patient.setEvaluations(evaluations);
    }

    return patient;
  }

  // --- fromDomain ---
  static fromDomain(patient: Patient): PatientEntity {
    const entity = new PatientEntity();
    entity.id = patient['id'];
    entity.fullName = patient['fullName'];
    entity.lastName = patient['lastName'];
    entity.gender = patient['gender'].getValue();
    entity.identityCard = patient['identityCard'].fullValue;
    entity.cellPhone = patient['cellPhone'].value;
    entity.latitude = patient['location'].lat;
    entity.longitude = patient['location'].lng;

    // Diagnóstico
    if (patient.getDiagnosis()) {
      entity.diagnosis = DiagnosisEntity.fromDomain(patient.getDiagnosis()!);
    }

    // Evaluaciones
    entity.evaluations = patient.getEvaluations().map(ev =>
      EvaluationEntity.fromDomain(ev)
    );

    return entity;
  }

}
