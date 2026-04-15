export class Height {
	constructor(private readonly value: number) {
		if (value <= 0.5 || value > 2.5) {
			throw new Error('Altura inválida. Debe ser entre 0.5 y 2.5 m.');
		}
	}

	getValue(): number {
		return this.value;
	}
}
