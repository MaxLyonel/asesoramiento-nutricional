import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import type { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { PatientEntity } from 'src/advice/infrastructure/entities/patient.entity';
import { GetAllPatientsQuery } from './get-all-patients.query';

@QueryHandler(GetAllPatientsQuery)
export class GetAllPatientsHandler implements IQueryHandler<GetAllPatientsQuery> {
  constructor(
    @Inject('PatientRepository')
    private readonly patientRepo: PatientRepository,
  ) {}

  async execute(_: GetAllPatientsQuery) {
    const patients = await this.patientRepo.findAll();
    console.log("patients: ", patients)
    return patients.map(PatientEntity.toDomain);
  }
}
