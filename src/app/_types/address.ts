import { Point } from 'geojson';

export class Address {
    address: string;
    location: Point;

    constructor(
        address: string,
        location: Point
    ) {
        this.address = address;
        this.location = location;
    }
}