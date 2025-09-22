import { Point } from 'geojson';

export class Address {
    city: string | null;
    province: string | null;
    postalCode: string | null;
    street: string;
    location: Point;

    constructor(
        city: string | null,
        province: string | null,
        postalCode: string | null,
        street: string,
        location: Point
    ) {
        this.city = city;
        this.province = province;
        this.postalCode = postalCode;
        this.street = street;
        this.location = location;
    }
}