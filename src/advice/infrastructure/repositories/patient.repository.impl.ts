import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { PatientEntity } from '../entities/patient.entity';
import { DiagnosisEntity } from '../entities/diagnosis.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientRepositoryImpl implements PatientRepository {
	constructor(
		@InjectRepository(PatientEntity)
		private readonly patientRepository: Repository<PatientEntity>,
	) {}

	async save(patient: Patient): Promise<any> {
		const pat = PatientEntity.fromDomain(patient);
		const newPatient = await this.patientRepository.save(pat);
		if (!newPatient) throw new Error('No se pudo crear al paciente');
		return newPatient;
	}

	async findById(patientId: string): Promise<any> {
		const patient = await this.patientRepository.findOne({
			where: { id: patientId },
			relations: ['evaluations', 'diagnosis'],
		});

		if (!patient)
			throw new Error(`No se encontró al paciente con id ${patientId}`);
		return patient;
	}

	async findAll(): Promise<any> {
		const patients = await this.patientRepository.find({
			relations: ['evaluations', 'diagnosis'],
		});
		return patients;
	}

	async findByIdentityCard(identityCard: any): Promise<any> {
		console.log('Buscando paciente con cédula:', identityCard);
		const patient = await this.patientRepository.findOne({
			where: { identityCard: identityCard.number },
		});

		return patient;
	}

	async update(patient: Patient, id: string): Promise<any> {
		const existingPatient = await this.patientRepository.findOne({
			where: { id },
			relations: ['diagnosis'],
		});

		if (!existingPatient) {
			throw new Error(`No se encontró al paciente con id ${id}`);
		}

		existingPatient.fullName = patient.fullName;
		existingPatient.lastName = patient.lastName;
		existingPatient.gender = patient.gender.getValue();
		existingPatient.identityCard = patient.identityCard.fullValue;
		existingPatient.cellPhone = patient.cellPhone.value;
		existingPatient.latitude = patient.location.lat;
		existingPatient.longitude = patient.location.lng;

		if (patient.getDiagnosis()) {
			const diagnosis = patient.getDiagnosis()!;
			if (existingPatient.diagnosis) {
				existingPatient.diagnosis.weight =
					diagnosis['weight'].getValue();
				existingPatient.diagnosis.height =
					diagnosis['height'].getValue();
				existingPatient.diagnosis.bodyComposition =
					diagnosis['bodyComposition'].getValue();
				existingPatient.diagnosis.objective = diagnosis.getObjective();
			} else {
				existingPatient.diagnosis =
					DiagnosisEntity.fromDomain(diagnosis);
			}
		}

		const updated = await this.patientRepository.save(existingPatient);
		return updated;
	}

	async delete(patientId: string): Promise<void> {
		const patient = await this.patientRepository.findOne({
			where: { id: patientId },
		});

		if (!patient) {
			throw new Error(`No se encontró al paciente con id ${patientId}`);
		}

		await this.patientRepository.remove(patient);
	}
}
