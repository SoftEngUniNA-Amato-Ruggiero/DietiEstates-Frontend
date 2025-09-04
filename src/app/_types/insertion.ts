import { Agency } from "./agency";
import { User } from "./user";
import { Address } from "./address";

export class Insertion {
    id: number | null = null;
    address: Address;
    details: {
        description: string;
    };
    uploader: User | null = null;
    agency: Agency | null = null;

    constructor(
        address: Address,
        details: {
            description: string;
        }
    ) {
        this.address = address;
        this.details = details;
    }
}