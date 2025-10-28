import { PatientAssignment } from "../entities/patient-assignment.entity";
import { NutritionistRepository } from "../repositories/nutrionist.repository";
import { PatientAssignmentRepository } from "../repositories/patient-assignment.repository";
import { PatientRepository } from "../repositories/patient.repository";



export class AssignPatientToNutritionistService {
  constructor(
    private patientAssignmentRepository: PatientAssignmentRepository,
    private patientRepository: PatientRepository,
    private nutritionistRepository: NutritionistRepository
  ) {}

  execute(patientId: number, nutritionistId: number, serviceType: string) {
    const nutritionist = this.nutritionistRepository.findById(nutritionistId);
    const patient = this.patientRepository.findById(patientId)


    const assignment = new PatientAssignment(
      nutritionistId,
      patientId,
      serviceType,
      new Date()
    );

    this.patientAssignmentRepository.save(assignment)
  }
}