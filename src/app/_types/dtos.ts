// Role class (mirrors the Java Role class with a single "name" field)
export class Role {
    name: string;

    constructor(name: string = '') {
        this.name = name;
    }
}

// Real Estate Agency DTOs
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

export class RealEstateAgencyRequestDTO {
    iban: string;
    name: string;

    constructor(iban: string = '', name: string = '') {
        this.iban = iban;
        this.name = name;
    }
}

// User DTOs
export class UserResponseDTO {
    id: number;
    username: string;
    roles: Array<Role>;

    constructor(id: number = 0, username: string = '', roles: Array<Role> = []) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}

export class UserRequestDTO {
    username: string;

    constructor(username: string = '') {
        this.username = username;
    }
}

// Business User DTO
export class BusinessUserResponseDTO {
    user: UserResponseDTO;
    agency: RealEstateAgencyResponseDTO;

    constructor(
        user: UserResponseDTO = new UserResponseDTO(),
        agency: RealEstateAgencyResponseDTO = new RealEstateAgencyResponseDTO()
    ) {
        this.user = user;
        this.agency = agency;
    }
}