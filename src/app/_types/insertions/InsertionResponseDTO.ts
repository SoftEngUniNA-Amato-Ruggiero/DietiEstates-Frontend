import { Address } from "../Address";
import { RealEstateAgencyResponseDTO } from "../RealEstateAgencyResponseDTO";
import { UserResponseDTO } from "../users/UserResponseDTO";

export interface InsertionResponseDTO {
    id: number;
    description: string;
    tags: string[];
    address: Address;
    uploader: UserResponseDTO;
    agency: RealEstateAgencyResponseDTO;
    size: number;
    numberOfRooms: number;
    floor: number;
    hasElevator: boolean;
}