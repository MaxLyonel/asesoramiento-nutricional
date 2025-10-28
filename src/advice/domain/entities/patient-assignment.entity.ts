export class PatientAssignment {
  private endDate: Date | null = null;

  constructor(
    private readonly patientId: number,
    private readonly nutritionistId: number,
    private readonly serviceType: string,
    private readonly startDate: Date
  ) {
    this.ensureValidStartDate(startDate);
  }

  // R1: No se puede asignar con una fecha futura inválida
  private ensureValidStartDate(date: Date) {
    const today = new Date();
    if (date > today) {
      throw new Error('La fecha de inicio no puede ser futura.');
    }
  }

  // R2: Terminar una asignación (regla: no antes del inicio)
  endAssignment(date: Date) {
    if (date < this.startDate) {
      throw new Error('La fecha de finalización no puede ser anterior al inicio.');
    }
    this.endDate = date;
  }

  // R3: Saber si la asignación sigue activa
  isActive(): boolean {
    return !this.endDate || this.endDate > new Date();
  }

  // R4: Devuelve un snapshot o DTO del estado actual
  toPrimitives() {
    return {
      patientId: this.patientId,
      nutritionistId: this.nutritionistId,
      serviceType: this.serviceType,
      startDate: this.startDate,
      endDate: this.endDate,
      active: this.isActive(),
    };
  }

  // Getters
  getPatientId() {
    return this.patientId;
  }

  getNutritionistId() {
    return this.nutritionistId;
  }

  getServiceType() {
    return this.serviceType;
  }

  getStartDate() {
    return this.startDate;
  }

  getEndDate() {
    return this.endDate;
  }
}
