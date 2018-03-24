import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { VendorService } from '../services/vendor.service';
import { Router, CanActivate } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  b_id;
  constructor(private auth: AuthService, private vendorService: VendorService, private router: Router) { }

  ngOnInit() {
    this.b_id = this.vendorService.getb_id();
    this.vendorService.getOrdersById(this.b_id).subscribe((res)=>{
      console.log(res);
      if(res.success){

      } else {

      }
    })

  }

  changeTab(tab) {
    switch (tab) {
      case "current":
        $('.order-cores').hide();
        $('.current-core').show();
        $('.tabs').removeClass('selected');
        $('.tab-current').addClass('selected');
        break;
        case "rejected":
        $('.order-cores').hide();
        $('.rejected-core').show();
        $('.tabs').removeClass('selected');
        $('.tab-rejected').addClass('selected');
        break;
        case "cancelled":
        $('.order-cores').hide();
        $('.cancelled-core').show();
        $('.tabs').removeClass('selected');
        $('.tab-cancelled').addClass('selected');
        break;
      default:
        break;
    }
  }

}
