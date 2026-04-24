import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePatientCommand } from './delete-patient.command';
import type { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { Inject } from '@nestjs/common';
import { OutboxService } from 'src/advice/infrastructure/services/outbox.service';

@CommandHandler(DeletePatientCommand)
export class DeletePatientHandler
	implements ICommandHandler<DeletePatientCommand>
{
	constructor(
		@Inject('PatientRepository')
		private readonly patientRepo: PatientRepository,
		private readonly outboxService: OutboxService,
	) {}

	async execute(command: DeletePatientCommand): Promise<any> {
		const { id } = command;

		await this.patientRepo.delete(id);

		await this.outboxService.addEvent({
			aggregateType: 'Advice',
			aggregateId: id,
			type: 'PatientDeleted',
			payload: { id },
		});

		return {
			status: 'success',
			message: 'Paciente eliminado correctamente',
		};
	}
}
