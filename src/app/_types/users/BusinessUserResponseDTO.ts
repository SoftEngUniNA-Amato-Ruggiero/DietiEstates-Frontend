import { RealEstateAgencyResponseDTO } from "../RealEstateAgencyResponseDTO";
import { UserResponseDTO } from "./UserResponseDTO";

export interface BusinessUserResponseDTO extends UserResponseDTO {
    agency: RealEstateAgencyResponseDTO;
}
