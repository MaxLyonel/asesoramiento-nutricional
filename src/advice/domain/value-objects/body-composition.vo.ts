export class BodyComposition {
  constructor(private readonly value: string) {
    const allowed = ['Normal', 'Sobrepeso', 'Obesidad', 'Delgado'];
    if (!allowed.includes(value)) {
      throw new Error(`Composición corporal inválida. Debe ser: ${allowed.join(', ')}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  isNormal(): boolean {
    return this.value === 'Normal';
  }
}