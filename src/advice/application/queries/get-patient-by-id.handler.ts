import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import type { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { PatientEntity } from 'src/advice/infrastructure/entities/patient.entity';
import { GetPatientByIdQuery } from './get-patient-by-id.query';

@QueryHandler(GetPatientByIdQuery)
export class GetPatientByIdHandler implements IQueryHandler<GetPatientByIdQuery> {
  constructor(
    @Inject('PatientRepository')
    private readonly patientRepo: PatientRepository,
  ) {}

  async execute(query: GetPatientByIdQuery) {
    const patient = await this.patientRepo.findById(query.id);
    if (!patient) throw new NotFoundException('Paciente no encontrado');
    return PatientEntity.toDomain(patient);
  }
}
