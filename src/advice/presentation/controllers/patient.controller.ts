import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AddEvaluationUseCase } from "src/advice/application/use-cases/add-evaluation-patient";
import { CreatePatientWithDiagnosis } from "src/advice/application/use-cases/create-patient-with-diagnosis";


@Controller('patient')
export class PatientController {
  constructor(
    private readonly createPatient: CreatePatientWithDiagnosis,
    private readonly addEvaluationPatient: AddEvaluationUseCase
  ) {}

  @Post('create')
  async createPatientWithDiagnosis(@Body() body: any) {
    try {
      const { id, fullName, lastName, gender, identityCard, cellPhone, location, diagnosisId, weight, height, bodyComposition } = body
      const result = await this.createPatient.execute(id, fullName, lastName, gender, identityCard, cellPhone, location, diagnosisId, weight, height, bodyComposition);
      return {
        status: 'success',
        message: 'Creacion de paciente exitoso',
        data: result
      }
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al crear un paciente'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('add-evaluation')
  async addEvaluation(@Body() body: any) {
    try {
      const { patientId, evaluationId, date, weight, height, bodyComposition  } = body
      const result = await this.addEvaluationPatient.execute(patientId, evaluationId, date, weight, height, bodyComposition, 1)
      return {
        status: 'success',
        message: 'Evaluacion realizada exitosamente',
        data: result
      }
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al realizar la evaluacion'
      }, HttpStatus.BAD_REQUEST)
    }
  }
}