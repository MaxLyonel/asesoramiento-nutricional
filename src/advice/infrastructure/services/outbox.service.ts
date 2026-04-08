import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { OutboxEvent } from "../entities/outbox.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OutboxService {
  constructor(
    @InjectRepository(OutboxEvent) private readonly db: Repository<OutboxEvent>
  ) {}

  async addEvent(event: any) {
    await this.db.query(
      `INSERT INTO outbox_event(id, aggregatetype, aggregateid, type, payload, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW())`,
      [event.aggregateType, event.aggregateId, event.type, JSON.stringify(event.payload)]
    );
  }
}