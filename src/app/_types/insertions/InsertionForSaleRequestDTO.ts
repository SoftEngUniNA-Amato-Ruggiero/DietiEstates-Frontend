import { InsertionRequestDTO } from "./InsertionRequestDTO";
import { FeatureCollection } from "geojson";

export class InsertionForSaleRequestDTO extends InsertionRequestDTO {
    price: number;

    constructor(
        tags: string[] = [],
        description: string = "",
        address: FeatureCollection,
        price: number = 0
    ) {
        super(tags, description, address);
        this.price = price;
    }
}