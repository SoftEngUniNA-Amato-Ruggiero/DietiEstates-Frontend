import { Point } from "geojson";

export interface Address {
    location: Point;
    countryCode?: string;
    housenumber?: string;
    street?: string;
    country?: string;
    state?: string;
    stateCode?: string;
    district?: string;
    city?: string;
    suburb?: string;
    county?: string;
    countyCode?: string;
    resultType?: string;
    postcode?: string;
    formatted?: string;
    addressLine1?: string;
    addressLine2?: string;
    plusCode?: string;
    plusCodeShort?: string;
    iso3166Dash2?: string;
    placeId?: string;
}