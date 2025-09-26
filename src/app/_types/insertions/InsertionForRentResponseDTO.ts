import { InsertionResponseDTO } from "./InsertionResponseDTO";

export interface InsertionForRentResponseDTO extends InsertionResponseDTO {
    rent: number;
}