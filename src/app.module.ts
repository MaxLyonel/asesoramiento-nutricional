import { Kafka } from './../node_modules/kafkajs/types/index.d';
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
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'nutritional-advice-consumer',
          }
        }
      }
    ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }