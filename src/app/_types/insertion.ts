import { Agency } from "./agency";
import { User } from "./user";

export class Insertion {
    id: number | null = null;
    address: string;
    location: string;
    details: {
        description: string;
    };
    uploader: User | null = null;
    agency: Agency | null = null;
    price: number | null = null;

    constructor(
        address: string,
        location: string,
        details: {
            description: string;
        },
    ) {
        this.address = address;
        this.location = location;
        this.details = details;
    }
}