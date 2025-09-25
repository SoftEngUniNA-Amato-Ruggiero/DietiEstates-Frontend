export class RealEstateAgencyRequestDTO {
    iban: string;
    name: string;

    constructor(iban: string = '', name: string = '') {
        this.iban = iban;
        this.name = name;
    }
}
