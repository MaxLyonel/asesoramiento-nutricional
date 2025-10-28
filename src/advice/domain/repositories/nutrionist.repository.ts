


export interface NutritionistRepository {
  findById(nutritionistId: number): Promise<any>;
}