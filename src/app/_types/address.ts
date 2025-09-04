import * as L from 'leaflet';

export class Address {
    street: string;
    houseNumber: number;
    city: string;
    postalCode: string;
    location: L.LatLngExpression;

    constructor(
        street: string,
        houseNumber: number,
        city: string,
        postalCode: string,
        location: L.LatLngExpression
    ) {
        this.street = street;
        this.houseNumber = houseNumber;
        this.city = city;
        this.postalCode = postalCode;
        this.location = location;
    }
}