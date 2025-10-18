import { BodyComposition } from "../value-objects/body-composition.vo";
import { Height } from "../value-objects/height.vo";
import { Weight } from "../value-objects/weight.vo";

export class Evaluation {
  constructor(
    private readonly id: string,
    private readonly date: Date,
    private readonly weight: Weight,
    private readonly height: Height,
    private readonly bodyComposition: BodyComposition,
    private readonly nutritionistId: number,
    private observations?: string,
  ) {}

  updateObservations(newObservations: string) {
    this.observations = newObservations;
  }

  getNutritionistId(): number {
    return this.nutritionistId;
  }

  getDate(): Date {
    return this.date;
  }
}
