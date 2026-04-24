import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddEvaluationPatientCommand } from 'src/advice/application/commands/add-evaluation-patient.command';
import { CreatePatientWithDiagnosisCommand } from 'src/advice/application/commands/create-patient-width-diagnosis.command';
import { UpdatePatientCommand } from 'src/advice/application/commands/update-patient.command';
import { DeletePatientCommand } from 'src/advice/application/commands/delete-patient.command';
import { GetAllPatientsQuery } from 'src/advice/application/queries/get-all-patients.query';
import { GetPatientByIdQuery } from 'src/advice/application/queries/get-patient-by-id.query';

@Controller('patient')
export class PatientController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@MessagePattern('create_patient')
	async createPatientWithDiagnosis(@Payload() body: any) {
		const {
			fullName,
			lastName,
			gender,
			identityCard,
			cellPhone,
			location,
			diagnosisId,
			weight,
			height,
			bodyComposition,
			objective,
		} = body;

		const result = await this.commandBus.execute(
			new CreatePatientWithDiagnosisCommand(
				fullName,
				lastName,
				gender,
				identityCard,
				cellPhone,
				location,
				diagnosisId,
				weight,
				height,
				bodyComposition,
				objective,
			),
		);

		return {
			status: 'success',
			message: 'Registro exitoso',
			data: result,
		};
	}

	@MessagePattern('get_all_patients')
	async getAllPatients(@Payload() body: any) {
		const result = await this.queryBus.execute(new GetAllPatientsQuery());
		return {
			status: 'success',
			message: 'Pacientes obtenidos exitosamente',
			data: result,
		};
	}

	@MessagePattern('get_patient_by_id')
	async getPatientById(@Payload() body: any) {
		const { id } = body;
		const result = await this.queryBus.execute(new GetPatientByIdQuery(id));
		return {
			status: 'success',
			message: 'Paciente obtenido exitosamente',
			data: result,
		};
	}

	@MessagePattern('update_patient')
	async updatePatient(@Payload() body: any) {
		const {
			id,
			fullName,
			lastName,
			gender,
			identityCard,
			cellPhone,
			location,
			weight,
			height,
			bodyComposition,
			objective,
		} = body;

		const result = await this.commandBus.execute(
			new UpdatePatientCommand(
				id,
				fullName,
				lastName,
				gender,
				identityCard,
				cellPhone,
				location,
				weight,
				height,
				bodyComposition,
				objective,
			),
		);
		return {
			status: 'success',
			message: 'Paciente actualizado exitosamente',
			data: result,
		};
	}

	@MessagePattern('delete_patient')
	async deletePatient(@Payload() body: any) {
		const { id } = body;
		const result = await this.commandBus.execute(
			new DeletePatientCommand(id),
		);
		return result;
	}

	@Post('create')
	async createPatient(@Body() body: any) {
		const {
			fullName,
			lastName,
			gender,
			identityCard,
			cellPhone,
			location,
			diagnosisId,
			weight,
			height,
			bodyComposition,
			objective,
		} = body;

		const result = await this.commandBus.execute(
			new CreatePatientWithDiagnosisCommand(
				fullName,
				lastName,
				gender,
				identityCard,
				cellPhone,
				location,
				diagnosisId,
				weight,
				height,
				bodyComposition,
				objective,
			),
		);

		return {
			status: 'success',
			message: 'Registro exitoso',
			data: result,
		};
	}

	@Post('add-evaluation')
	async addEvaluation(@Body() body: any) {
		try {
			const {
				patientId,
				evaluationId,
				date,
				weight,
				height,
				bodyComposition,
			} = body;
			// const result = await this.addEvaluationPatient.execute(patientId, evaluationId, date, weight, height, bodyComposition, 1)
			const result = this.commandBus.execute(
				new AddEvaluationPatientCommand(
					patientId,
					evaluationId,
					date,
					weight,
					height,
					bodyComposition,
					1,
				),
			);
			return {
				status: 'success',
				message: 'Evaluacion realizada exitosamente',
				data: result,
			};
		} catch (error: any) {
			throw new HttpException(
				{
					status: 'error',
					message: error.message || 'Error al realizar la evaluacion',
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	@Get('all')
	async getAll() {
		try {
			const result = await this.queryBus.execute(
				new GetAllPatientsQuery(),
			);
			return {
				status: 'success',
				message: 'Pacientes obtenidos exitosamente',
				data: result,
			};
		} catch (error: any) {
			throw new HttpException(
				{
					status: 'error',
					message: error.message || 'Error al obtener los pacientes',
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		try {
			const result = await this.queryBus.execute(
				new GetPatientByIdQuery(id),
			);
			return {
				status: 'success',
				message: 'Paciente obtenido exitosamente',
				data: result,
			};
		} catch (error: any) {
			throw new HttpException(
				{
					status: 'error',
					message: error.message || 'Error al obtener al paciente',
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
