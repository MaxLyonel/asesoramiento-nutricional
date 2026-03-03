

export class AddEvaluationPatientCommand {
  constructor(
    public readonly patientId: string,
    public readonly evaluationId: string,
    public readonly date: Date,
    public readonly weight: number,
    public readonly height: number,
    public readonly bodyComposition: string,
    public readonly nutritionistId: number
  ) {}
}