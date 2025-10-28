import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PatientRepository } from "src/advice/domain/repositories/patient.repository";
import { PatientAssignmentEntity } from "../entities/assigned.entity";
import { Repository } from "typeorm";
import { Patient } from "src/advice/domain/entities/patient.entity";
import { PatientAssignmentRepository } from "src/advice/domain/repositories/patient-assignment.repository";




@Injectable()
export class PatientAssignmentRepositoryImpl implements PatientAssignmentRepository {
  constructor(
    @InjectRepository(PatientAssignmentEntity) private readonly patientAssignmentRepository: Repository<PatientAssignmentEntity>
  ) {}

  async save(obj: any): Promise<any> {
    const patient = await this.patientAssignmentRepository.save(obj)
    if(!patient) throw new Error("No se pudo crear la asignación")
  }

}