// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DomainExceptionFilter } from './advice/infrastructure/filters/domain-exception.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalFilters(new DomainExceptionFilter());
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { GlobalRpcExceptionFilter } from './advice/infrastructure/filters/global-rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'nutritional-advice-consumer',
      },
    },
  });

  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  await app.listen();
}
bootstrap();