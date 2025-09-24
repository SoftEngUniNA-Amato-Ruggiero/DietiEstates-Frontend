import { FeatureCollection } from "geojson";
import { Agency } from "../agency";
import { User } from "../users/user";
import { InsertionDetails } from "./insertion-details";

export class Insertion {
    address: FeatureCollection;
    details: InsertionDetails;
    price: number | null = null;
    rent: number | null = null;

    constructor(
        address: FeatureCollection,
        details: InsertionDetails,
        price: number | null,
        rent: number | null
    ) {
        this.address = address;
        this.details = details;
        this.price = price;
        this.rent = rent;
    }
}