import { BodyComposition } from "../value-objects/body-composition.vo";
import { Height } from "../value-objects/height.vo";
import { Weight } from "../value-objects/weight.vo";

export class Diagnosis {
  constructor(
    private readonly id: string,
    private readonly weight: Weight,
    private readonly height: Height,
    private readonly bodyComposition: BodyComposition,
    private observations?: string
  ) {}

  updateObservations(obs: string) {
    this.observations = obs;
  }
}