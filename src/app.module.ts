import { Module } from '@nestjs/common';
import { AdviceModule } from './advice/advice.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	imports: [
		AdviceModule,
		DatabaseModule,
		ClientsModule.register([
			{
				name: 'KAFKA_SERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						brokers: ['kafka:9092'],
					},
					consumer: {
						groupId: 'nutritional-advice-consumer',
						retry: {
							retries: 10,
							initialRetryTime: 3000,
						},
					},
				},
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
