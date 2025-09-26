import { RealEstateAgencyResponseDTO } from "../RealEstateAgencyResponseDTO";
import { UserResponseDTO } from "../users/UserResponseDTO";
import { Point } from "geojson";

export interface InsertionResponseDTO {
    id: number;
    description: string;
    tags: string[];
    address: { id: number, location: Point };
    uploader: UserResponseDTO;
    agency: RealEstateAgencyResponseDTO;
}