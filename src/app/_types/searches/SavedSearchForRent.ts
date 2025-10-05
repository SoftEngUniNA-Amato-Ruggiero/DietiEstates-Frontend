import { Point } from 'geojson';
import { SavedSearch } from './SavedSearch';

export class SavedSearchForRent extends SavedSearch {
    maxRent: number | undefined = undefined;

    constructor(id: number, geometry: Point, distance: number, init?: Partial<SavedSearchForRent>) {
        super(id, geometry, distance, init);
        Object.assign(this, init);
    }
}
