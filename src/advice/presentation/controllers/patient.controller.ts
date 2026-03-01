import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Subscriber } from "rxjs";
import { AddEvaluationPatientCommand } from "src/advice/application/commands/add-evaluation-patient.command";
import { CreatePatientWithDiagnosisCommand } from "src/advice/application/commands/create-patient-width-diagnosis.command";
import { GetAllPatientsQuery } from "src/advice/application/queries/get-all-patients.query";
import { GetPatientByIdQuery } from "src/advice/application/queries/get-patient-by-id.query";
import { AddEvaluationUseCase } from "src/advice/application/use-cases/add-evaluation-patient";
import { CreatePatientWithDiagnosis } from "src/advice/application/use-cases/create-patient-with-diagnosis";


@Controller('patient')
export class PatientController {
  constructor(
    // private readonly createPatient: CreatePatientWithDiagnosis,
    // private readonly addEvaluationPatient: AddEvaluationUseCase,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  // @Post('create')
  // async createPatientWithDiagnosis(@Body() body: any) {
  //   try {
  //     const { id, fullName, lastName, gender, identityCard, cellPhone, location, diagnosisId, weight, height, bodyComposition } = body
  //     const result = await this.createPatient.execute(id, fullName, lastName, gender, identityCard, cellPhone, location, diagnosisId, weight, height, bodyComposition);
  //     return {
  //       status: 'success',
  //       message: 'Creacion de paciente exitoso',
  //       data: result
  //     }
  //   } catch(error) {
  //     throw new HttpException({
  //       status: 'error',
  //       message: error.message || 'Error al crear un paciente'
  //     }, HttpStatus.BAD_REQUEST)
  //   }
  // }

  // @Post('create')
  @MessagePattern('create_patient')
  async createPatientWithDiagnosis(@Payload() body: any) {
    const { fullName, lastName, gender, identityCard,
      cellPhone, location, diagnosisId, weight,
      height, bodyComposition } = body

    const result = await this.commandBus.execute(
      new CreatePatientWithDiagnosisCommand (
        fullName, lastName, gender,
        identityCard, cellPhone, location,
        diagnosisId, weight, height, bodyComposition
        )
      );

    return {
      status: 'success',
      message: 'Registro exitoso',
      data: result
    }
  }

  @Post('add-evaluation')
  async addEvaluation(@Body() body: any) {
    try {
      const { patientId, evaluationId, date, weight, height, bodyComposition  } = body
      // const result = await this.addEvaluationPatient.execute(patientId, evaluationId, date, weight, height, bodyComposition, 1)
      const result = this.commandBus.execute(new AddEvaluationPatientCommand(patientId, evaluationId, date, weight, height, bodyComposition, 1))
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

  @Get('all')
  async getAll() {
    try {
      const result = await this.queryBus.execute(new GetAllPatientsQuery());
      return {
        status: 'success',
        message: 'Pacientes obtenidos exitosamente',
        data: result
      }
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al obtener los pacientes'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const result = await this.queryBus.execute(new GetPatientByIdQuery(+id));
      return {
        status: 'success',
        message: 'Paciente obtenido exitosamente',
        data: result
      }
    } catch(error) {
      throw new HttpException({
        status: 'error',
        message: error.message || 'Error al obtener al paciente'
      }, HttpStatus.BAD_REQUEST)
    }
  }
}