import { Patient } from "../entities/patient.entity";



export interface PatientRepository {
  save(patient: Patient): Promise<void>;
  findById(patientId: number): Promise<any>;
  findAll(): Promise<any>;
}