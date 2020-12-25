import { Component, OnInit } from '@angular/core';
import { IAddress } from '../model/header.interface';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name:string = "IP Address Tracker";
  ip!: string;

  IpAddress!: IAddress;

  constructor(private addressService : AddressService ) { }

  ngOnInit(): void {

  }

  getIpAddress(ip:string): void{
    this.addressService.getAddress(ip)
    .subscribe((address:IAddress) => {
      console.log(address);
      this.IpAddress = address
    })
  }

}
