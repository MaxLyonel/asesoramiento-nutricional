import { Module } from '@nestjs/common';
import { AdviceModule } from './advice/advice.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [AdviceModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
