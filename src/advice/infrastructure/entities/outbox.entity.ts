import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
} from 'typeorm';

@Entity('outbox_event')
export class OutboxEvent {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	aggregateid: string;

	@Column()
	aggregatetype: string;

	@Column()
	type: string;

	@Column({ type: 'jsonb' })
	payload: any;

	@CreateDateColumn()
	created_at: Date;
}
