import { Point } from "geojson";
import { SavedSearch } from "./SavedSearch";

export class SavedSearchForSale extends SavedSearch {
    maxPrice: number | undefined = undefined;

    constructor(geometry: Point, distance: number, init?: Partial<SavedSearchForSale>) {
        super(geometry, distance, init);
        Object.assign(this, init);
    }
}
