import { InsertionResponseDTO } from "./InsertionResponseDTO";

export interface InsertionForSaleResponseDTO extends InsertionResponseDTO {
    price: number;
}