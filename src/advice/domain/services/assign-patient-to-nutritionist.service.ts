import { PatientAssignment } from '../entities/patient-assignment.entity';
import { NutritionistRepository } from '../repositories/nutrionist.repository';
import { PatientAssignmentRepository } from '../repositories/patient-assignment.repository';
import { PatientRepository } from '../repositories/patient.repository';

export class AssignPatientToNutritionistService {
	constructor(
		private patientAssignmentRepository: PatientAssignmentRepository,
		private patientRepository: PatientRepository,
		private nutritionistRepository: NutritionistRepository,
	) {}

	async execute(
		patientId: string,
		nutritionistId: number,
		serviceType: string,
	) {
		await this.nutritionistRepository.findById(nutritionistId);
		await this.patientRepository.findById(patientId);

		const assignment = new PatientAssignment(
			nutritionistId,
			patientId,
			serviceType,
			new Date(),
		);

		return this.patientAssignmentRepository.save(assignment);
	}
}
