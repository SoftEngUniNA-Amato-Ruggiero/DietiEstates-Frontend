export class RealEstateAgencyResponseDTO {
    id: number;
    iban: string;
    name: string;

    constructor(id: number = 0, iban: string = '', name: string = '') {
        this.id = id;
        this.iban = iban;
        this.name = name;
    }
}
