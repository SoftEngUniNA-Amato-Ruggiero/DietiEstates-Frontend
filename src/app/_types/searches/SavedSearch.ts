import { Point } from "geojson";

export class SavedSearch {
    geometry: Point;
    distance: number;
    tags: string[] = [];
    minSize: number | undefined = undefined;
    minNumberOfRooms: number | undefined = undefined;
    maxFloor: number | undefined = undefined;
    hasElevator: boolean | undefined = undefined;

    constructor(geometry: Point, distance: number, init?: Partial<SavedSearch>) {
        this.geometry = geometry;
        this.distance = distance;
        Object.assign(this, init);
    }
}