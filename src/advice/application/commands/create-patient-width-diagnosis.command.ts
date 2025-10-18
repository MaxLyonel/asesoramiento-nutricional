export class CreatePatientWithDiagnosisCommand {
  constructor(
    public readonly id: number,
    public readonly fullName: string,
    public readonly lastName: string,
    public readonly gender: 'M' | 'F',
    public readonly identityCard: string,
    public readonly cellPhone: string,
    public readonly location: { latitude: number; longitude: number },
    public readonly diagnosisId: string,
    public readonly weight: number,
    public readonly height: number,
    public readonly bodyComposition: string
  ) {}
}
