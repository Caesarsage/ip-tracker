import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import * as Mapboxgl from "mapbox-gl";
import { environment } from 'src/environments/environment.prod';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() ipLat?: number;
  @Input() ipLog?: number;

  latHolder!: number;
  lonHolder?: number;

  map!: Mapboxgl.Map;

  constructor(private currentLocation:AddressService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.latHolder = changes['ipLat'].currentValue;
    this.lonHolder = changes['ipLog'].currentValue;
    if (this.latHolder && this.lonHolder) {
      this.getMap(this.lonHolder, this.latHolder)
      this.createMarker(this.lonHolder, this.latHolder)
    }
  }

  ngOnInit(): void {
    this.currentLocation.getUserLocation()
    .then(resp=>{
      this.getMap(resp.lon, resp.lat);
      this.createMarker(resp.lon, resp.lat)
    })
    .catch(err => console.log('Location Not found!!!')
    )
  }

  // displaying map
  getMap(lon:number, lat: number){
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.map = new Mapboxgl.Map({
      container: 'mapbox-map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [lon , lat], // starting position [lng, lat]
      zoom: 10 // starting zoom
    });
  }

  // mapbox marker indicator creation method
  createMarker(log:number, lat:number){
    const marker = new Mapboxgl.Marker()
    .setLngLat([log, lat])
    .addTo(this.map);
  }

}
