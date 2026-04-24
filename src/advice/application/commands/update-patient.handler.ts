import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Patient } from 'src/advice/domain/entities/patient.entity';
import { Diagnosis } from 'src/advice/domain/entities/diagnosis.entity';
import { UpdatePatientCommand } from './update-patient.command';
import type { PatientRepository } from 'src/advice/domain/repositories/patient.repository';
import { Gender } from 'src/advice/domain/value-objects/gender.vo';
import { IdentityCard } from 'src/advice/domain/value-objects/identity-card.vo';
import { CellPhone } from 'src/advice/domain/value-objects/cell-phone.vo';
import { Location } from 'src/advice/domain/value-objects/location.vo';
import { Weight } from 'src/advice/domain/value-objects/weight.vo';
import { Height } from 'src/advice/domain/value-objects/height.vo';
import { BodyComposition } from 'src/advice/domain/value-objects/body-composition.vo';
import { Inject } from '@nestjs/common';
import { OutboxService } from 'src/advice/infrastructure/services/outbox.service';

@CommandHandler(UpdatePatientCommand)
export class UpdatePatientHandler
	implements ICommandHandler<UpdatePatientCommand>
{
	constructor(
		@Inject('PatientRepository')
		private readonly patientRepo: PatientRepository,
		private readonly outboxService: OutboxService,
	) {}

	async execute(command: UpdatePatientCommand): Promise<any> {
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
		} = command;

		const patient = new Patient(
			fullName,
			lastName,
			new Gender(gender),
			new IdentityCard(identityCard),
			new CellPhone(cellPhone),
			new Location(location.latitude, location.longitude),
		);

		const diag = new Diagnosis(
			new Weight(weight),
			new Height(height),
			new BodyComposition(bodyComposition),
			objective,
		);

		patient.setInitialDiagnosis(diag);

		const updated: any = await this.patientRepo.update(patient, id);

		await this.outboxService.addEvent({
			aggregateType: 'Advice',
			aggregateId: id,
			type: 'PatientUpdated',
			payload: updated,
		});

		return patient;
	}
}
