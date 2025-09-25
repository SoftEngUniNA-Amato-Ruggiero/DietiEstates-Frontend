import { FeatureCollection } from "geojson";
import { InsertionDetails } from "./InsertionDetails";
import { Insertion } from "./Insertion";

export class InsertionForSale extends Insertion {
    price: number | null = null;

    constructor(
        address: FeatureCollection,
        details: InsertionDetails,
        price: number | null,
    ) {
        super(address, details);
        this.price = price;
    }
}