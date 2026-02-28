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
import { PatientUniquenessChecker } from 'src/advice/domain/services/patient-unique.service';

@CommandHandler(CreatePatientWithDiagnosisCommand)
export class CreatePatientWithDiagnosisHandler
  implements ICommandHandler<CreatePatientWithDiagnosisCommand>
{
  constructor(
    @Inject('PatientRepository')
    private readonly patientRepo: PatientRepository,
    private readonly uniquenessChecker: PatientUniquenessChecker
  ) {}

  async execute(command: CreatePatientWithDiagnosisCommand): Promise<Patient> {
    const {
      fullName,
      lastName,
      gender,
      identityCard,
      cellPhone,
      location,
      // diagnosisId,
      weight,
      height,
      bodyComposition,
    } = command;

    try {
      await this.uniquenessChecker.ensureUnique(new IdentityCard(identityCard));
      const patient = new Patient(
        fullName,
        lastName,
        new Gender(gender),
        new IdentityCard(identityCard),
        new CellPhone(cellPhone),
        new Location(location.latitude, location.longitude),
      );

      const diag = new Diagnosis(
        // diagnosisId,
        new Weight(weight),
        new Height(height),
        new BodyComposition(bodyComposition),
      );

      patient.setInitialDiagnosis(diag);

      await this.patientRepo.save(patient);
      return patient;
    } catch (error) {
      // if (error instanceof UniqueConstraintError) {
      //   throw new PatientAlreadyExistsError();
      // }
      throw error;
    }
  }
}
