
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { GlobalRpcExceptionFilter } from './advice/infrastructure/filters/global-rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
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
        }
      },
    },
  });

  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  await app.listen();
}
bootstrap();