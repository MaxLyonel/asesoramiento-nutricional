import { Patient } from '../entities/patient.entity';

export interface PatientRepository {
	save(patient: Patient): Promise<void>;
	findById(patientId: string): Promise<any>;
	findAll(): Promise<any>;
	findByIdentityCard(identityCard: any): Promise<any>;
	update(patient: Patient, id: string): Promise<any>;
	delete(patientId: string): Promise<void>;
}
