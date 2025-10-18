export class Gender {
  constructor(private readonly value: 'M' | 'F') {}
  getValue() { return this.value; }
}