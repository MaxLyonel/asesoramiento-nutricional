export class IdentityCard {
  private readonly number: string;
  private readonly complement?: string; // opcional (no todos lo tienen)

  constructor(number: string, complement?: string) {
    // ✅ Validación 1: formato del número (solo dígitos, longitud razonable)
    if (!/^\d{4,10}$/.test(number)) {
      throw new Error('Número de carnet inválido');
    }

    // ✅ Validación 2: complemento (solo letras, máx 2 caracteres)
    if (complement && !/^[A-Z]{1,2}$/.test(complement)) {
      throw new Error('Complemento inválido');
    }

    this.number = number;
    this.complement = complement?.toUpperCase(); // normalizamos
  }

  // 🔹 Devuelve el valor combinado, útil para mostrar o persistir
  get fullValue(): string {
    return this.complement ? `${this.number}-${this.complement}` : this.number;
  }

  // 🔹 Compara por valor (no por referencia)
  equals(other: IdentityCard): boolean {
    return this.number === other.number && this.complement === other.complement;
  }

  // 🔹 Para serialización (ej. persistencia o API)
  toPrimitives() {
    return {
      number: this.number,
      complement: this.complement ?? null,
    };
  }
}
