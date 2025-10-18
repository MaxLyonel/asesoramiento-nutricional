export class Weight {
  constructor(private readonly value: number) {
    if (value <= 0 || value > 500) {
      throw new Error('Peso inválido. Debe ser entre 1 y 500 kg.');
    }
  }

  getValue(): number {
    return this.value;
  }

  isHealthy(): boolean {
    return this.value >= 50 && this.value <= 100; // ejemplo simple
  }
}