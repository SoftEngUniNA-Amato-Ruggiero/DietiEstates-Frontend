import { RealEstateAgencyResponseDTO } from "../RealEstateAgencyResponseDTO";
import { UserResponseDTO } from "./UserResponseDTO";

export interface BusinessUserResponseDTO {
    user: UserResponseDTO;
    agency: RealEstateAgencyResponseDTO;
}
