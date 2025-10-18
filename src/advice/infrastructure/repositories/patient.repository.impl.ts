import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Patient } from "src/advice/domain/entities/patient.entity";
import { PatientRepository } from "src/advice/domain/repositories/patient.repository";
import { PatientEntity } from "../entities/patient.entity";
import { Repository } from "typeorm";


@Injectable()
export class PatienRepositoryImpl implements PatientRepository {
  constructor(
    @InjectRepository(PatientEntity) private readonly patientRepository: Repository<PatientEntity>
  ) {}

  async save(patient: Patient): Promise<void> {
    const pat = PatientEntity.fromDomain(patient)
    const newPatient = await this.patientRepository.save(pat)
    if(!newPatient)  throw new Error("No se pudo crear al paciente")
  }

  async findById(patientId: number): Promise<any> {
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
      relations: ['evaluations', 'diagnosis'],
    });

    if (!patient) throw new Error(`No se encontró al paciente con id ${patientId}`);
    return patient;
  }

  async findAll(): Promise<any> {
    const patients = await this.patientRepository.find({
      relations: ['evaluations', 'diagnosis'],
    })
    return patients
  }

}