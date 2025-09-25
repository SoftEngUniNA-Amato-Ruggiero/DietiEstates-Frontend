import { RealEstateAgencyResponseDTO } from "../RealEstateAgencyResponseDTO";
import { UserResponseDTO } from "./UserResponseDTO";

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
