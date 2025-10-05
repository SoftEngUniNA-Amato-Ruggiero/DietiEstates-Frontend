import { Point } from 'geojson';
import { SavedSearch } from './SavedSearch';

export class SavedSearchForRent extends SavedSearch {
    maxRent: number | undefined = undefined;

    constructor(geometry: Point, distance: number, init?: Partial<SavedSearchForRent>) {
        super(geometry, distance, init);
        Object.assign(this, init);
    }
}
