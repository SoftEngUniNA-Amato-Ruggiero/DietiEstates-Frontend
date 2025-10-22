import { Point } from "geojson";

export class SavedSearch {
    id: number;
    geometry: Point;
    distance: number;
    tags: string[] = [];
    minSize: number | undefined = undefined;
    minNumberOfRooms: number | undefined = undefined;
    maxFloor: number | undefined = undefined;
    hasElevator: boolean | undefined = undefined;
    address: string | undefined = undefined;

    constructor(id: number, geometry: Point, distance: number, init?: Partial<SavedSearch>) {
        this.id = id;
        this.geometry = geometry;
        this.distance = distance;
        Object.assign(this, init);
    }
}