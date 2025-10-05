import { Point } from "geojson";
import { SavedSearch } from "./SavedSearch";

export class SavedSearchForSale extends SavedSearch {
    maxPrice: number | undefined = undefined;

    constructor(id: number, geometry: Point, distance: number, init?: Partial<SavedSearchForSale>) {
        super(id, geometry, distance, init);
        Object.assign(this, init);
    }
}
