import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { Diagnosis } from 'src/advice/domain/entities/diagnosis.entity';
import { CreatePatientWithDiagnosisCommand } from './create-patient-width-diagnosis.command';
import type { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { Gender } from 'src/advice/domain/value-objects/gender.vo';
import { IdentityCard } from 'src/advice/domain/value-objects/identity-card.vo';
import { CellPhone } from 'src/advice/domain/value-objects/cell-phone.vo';
import { Location } from 'src/advice/domain/value-objects/location.vo';
import { Weight } from 'src/advice/domain/value-objects/weight.vo';
import { Height } from 'src/advice/domain/value-objects/height.vo';
import { BodyComposition } from 'src/advice/domain/value-objects/body-composition.vo';
import { Inject } from '@nestjs/common';

@CommandHandler(CreatePatientWithDiagnosisCommand)
export class CreatePatientWithDiagnosisHandler
  implements ICommandHandler<CreatePatientWithDiagnosisCommand>
{
  constructor(
    @Inject('PatientRepository')
    private readonly patientRepo: PatientRepository) {}

  async execute(command: CreatePatientWithDiagnosisCommand): Promise<Patient> {
    const {
      id,
      fullName,
      lastName,
      gender,
      identityCard,
      cellPhone,
      location,
      diagnosisId,
      weight,
      height,
      bodyComposition,
    } = command;

    const patient = new Patient(
      id,
      fullName,
      lastName,
      new Gender(gender),
      new IdentityCard(identityCard),
      new CellPhone(cellPhone),
      new Location(location.latitude, location.longitude),
    );

    const diag = new Diagnosis(
      diagnosisId,
      new Weight(weight),
      new Height(height),
      new BodyComposition(bodyComposition),
    );

    patient.setInitialDiagnosis(diag);

    await this.patientRepo.save(patient);
    return patient;
  }
}
