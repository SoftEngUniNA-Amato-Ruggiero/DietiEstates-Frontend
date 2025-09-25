import { FeatureCollection } from "geojson";
import { InsertionDetails } from "./InsertionDetails";

export abstract class Insertion {
    address: FeatureCollection;
    details: InsertionDetails;

    constructor(
        address: FeatureCollection,
        details: InsertionDetails,
    ) {
        this.address = address;
        this.details = details;
    }
}