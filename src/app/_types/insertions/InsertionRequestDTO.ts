import { FeatureCollection } from "geojson";

export abstract class InsertionRequestDTO {
    tags: string[];
    description: string;
    address: FeatureCollection;

    constructor(tags: string[] = [], description: string = "", address: FeatureCollection) {
        this.tags = tags;
        this.description = description;
        this.address = address;
    }
}