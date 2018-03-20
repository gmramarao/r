import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/vendor.service';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-my-cash',
  templateUrl: './my-cash.component.html',
  styleUrls: ['./my-cash.component.css']
})
export class MyCashComponent implements OnInit {
  user: any = [];
  constructor(private vendorService: VendorService, private authService: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(this.authService.getUserFromLocal());
    this.vendorService.getPresentCash(this.user.id).subscribe((res)=>{
      if(res.status){
        console.log(res.msg);
      } else {

      }
    })
    this.vendorService.getPaymentHistory(this.user.id).subscribe((res)=>{
      if(res.status){
        console.log(res.msg);
      } else {

      }
    })
  }

}
