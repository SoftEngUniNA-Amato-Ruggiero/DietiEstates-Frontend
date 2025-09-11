import { Address } from "./address";
import { Agency } from "./agency";
import { User } from "./user";

export class Insertion {
    id: number | null = null;
    address: Address;
    details: {
        tags: string[];
        description: string | null;
    };
    uploader: User | null = null;
    agency: Agency | null = null;

    constructor(
        address: Address,
        details: {
            tags: string[];
            description: string | null;
        },
        uploader: User | null,
        agency: Agency | null
    ) {
        this.address = address;
        this.details = details;
        this.uploader = uploader;
        this.agency = agency;
    }
}