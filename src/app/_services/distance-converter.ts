import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanceConverter {
  degreesToKilometers(degrees: number): number {
    return degrees * 111.32;
  }

  kilometersToDegrees(kilometers: number): number {
    return kilometers / 111.32;
  }

}
