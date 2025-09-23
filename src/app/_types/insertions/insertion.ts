import { FeatureCollection } from "geojson";
import { Agency } from "../agency";
import { User } from "../users/user";
import { InsertionDetails } from "./insertion-details";

export class Insertion {
    id: number | null = null;
    address: FeatureCollection;
    details: InsertionDetails;
    uploader: User | null = null;
    agency: Agency | null = null;

    constructor(
        address: FeatureCollection,
        details: InsertionDetails,
        uploader: User | null,
        agency: Agency | null
    ) {
        this.address = address;
        this.details = details;
        this.uploader = uploader;
        this.agency = agency;
    }
}