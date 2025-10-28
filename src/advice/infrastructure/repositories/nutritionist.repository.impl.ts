import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NutritionistRepository } from "src/advice/domain/repositories/nutrionist.repository";
import { NutritionistEntity } from "../entities/nutritionist.entity";
import { Repository } from "typeorm";



@Injectable()
export class NutritionistRepositoryImpl implements NutritionistRepository {

  constructor(
    @InjectRepository(NutritionistEntity) private readonly nutritionistRepository: Repository<NutritionistEntity>
  ) { }

  async findById(nutritionistId: number): Promise<any> {
    const nutritionist = await this.nutritionistRepository.findOne({
      where: { id: nutritionistId },
    })

    if(!nutritionist) throw new Error(`No se encontró al nutricionista con id ${nutritionist}`)
    return nutritionist
  }
}