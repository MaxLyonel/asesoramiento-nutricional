import { Module } from "@nestjs/common";
import { OutboxService } from "./outbox.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OutboxEvent } from "../entities/outbox.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OutboxEvent
    ]),
  ],
  providers: [OutboxService],  // ✅ En providers, no imports
  exports: [OutboxService],    // si quieres usarlo en otros módulos
})
export class OutboxModule {}