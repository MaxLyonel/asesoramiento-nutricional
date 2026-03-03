import { Patient } from "../entities/patient.entity";



export interface PatientRepository {
  save(patient: Patient): Promise<void>;
  findById(patientId: string): Promise<any>;
  findAll(): Promise<any>;
  findByIdentityCard(identityCard: any): Promise<any>;
}