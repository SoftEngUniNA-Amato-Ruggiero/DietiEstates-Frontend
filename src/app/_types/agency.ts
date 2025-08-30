export class Agency {
    id: number | null;
    iban: string;
    name: string;

    constructor(iban: string, name: string) {
        this.iban = iban;
        this.name = name;
        this.id = null;
    }
}