import { FeatureCollection } from "geojson";

export class InsertionRequestDTO {
    tags: string[];
    description: string;
    address: FeatureCollection;
    size?: number;
    numberOfRooms?: number;
    floor?: number;
    hasElevator?: boolean;

    constructor(
        tags: string[] = [],
        description: string = "",
        address: FeatureCollection,
        size: number | undefined = undefined,
        numberOfRooms: number | undefined = undefined,
        floor: number | undefined = undefined,
        hasElevator: boolean | undefined = undefined
    ) {
        this.tags = tags;
        this.description = description;
        this.address = address;
        this.size = size;
        this.numberOfRooms = numberOfRooms;
        this.floor = floor;
        this.hasElevator = hasElevator;
    }
}