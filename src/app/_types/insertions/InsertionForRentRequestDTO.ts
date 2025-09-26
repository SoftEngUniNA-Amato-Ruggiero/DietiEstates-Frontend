import { InsertionRequestDTO } from "./InsertionRequestDTO";
import { FeatureCollection } from "geojson";

export class InsertionForRentRequestDTO extends InsertionRequestDTO {
    rent: number;

    constructor(
        tags: string[] = [],
        description: string = "",
        address: FeatureCollection,
        rent: number = 0
    ) {
        super(tags, description, address);
        this.rent = rent;
    }
}