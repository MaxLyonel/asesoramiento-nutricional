import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { GlobalRpcExceptionFilter } from './advice/infrastructure/filters/global-rpc-exception.filter';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.KAFKA,
		options: {
			client: {
				brokers: [process.env.KAFKA_BROKER],
			},
			consumer: {
				groupId: 'nutritional-advice-consumer',
				retry: {
					retries: parseInt(process.env.KAFKA_RETRIES || '10', 10),
					initialRetryTime: parseInt(
						process.env.KAFKA_RETRY_TIME || '3000',
						10,
					),
				},
			},
		},
	});

	app.useGlobalFilters(new GlobalRpcExceptionFilter());
	await app.listen();
}
bootstrap();
