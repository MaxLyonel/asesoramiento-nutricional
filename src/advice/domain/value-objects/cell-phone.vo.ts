
export class CellPhone {
  constructor(private readonly number: string) {
    // if (!/^\+\d{7,15}$/.test(number)) {
    //   throw new Error('Número de celular inválido');
    // }
  }

  get value(): string {
    return this.number;
  }
}