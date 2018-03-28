import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/vendor.service';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {

  user: any = [];
  b_id;
  cash;
  constructor(private vendorService: VendorService, private authService: AuthService) { }

  ngOnInit() {
    // this.user = JSON.parse(this.authService.getUserFromLocal());
    // console.log(this.user);
    this.b_id = this.vendorService.getb_id();
    this.vendorService.getPresentCash(this.b_id).subscribe((res)=>{
      if(res.success){
        console.log(res.msg);
        this.cash = res.msg.balance;
      } else {

      }
    })
    // this.vendorService.getPaymentHistory(this.user.id).subscribe((res)=>{
    //   if(res.status){
    //     console.log(res.msg);
    //   } else {

    //   }
    // })
  }

}
