import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-business-notifications',
  templateUrl: './business-notifications.component.html',
  styleUrls: ['./business-notifications.component.css']
})
export class BusinessNotificationsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private vendorService: VendorService,
    private title: Title) { }

    b_id;
    business_name;
    business_status;
    vendor_id;
    business_type;
    orders: any = [];
    get_notification = 4000;
  ngOnInit() {
    const vendor_obj = JSON.parse(localStorage.getItem('user'));
    this.vendor_id = vendor_obj.id;
    this.b_id = this.vendorService.getb_id();
    console.log(this.b_id);
    this.vendorService.getNotification(this.b_id).subscribe(order => {
      if (order.success) {
        this.orders = order.msg;
      }
    });
    setInterval(()=> {
      this.vendorService.getNotification(this.b_id).subscribe(order => {
        if (order.success) {
          this.orders = order.msg;
        }
      });
     },this.get_notification); 
    // this.route.params.subscribe(params => {
    //   // alert(params['id']);
    //   this.business_id = params['id'];
    //   console.log(this.business_id);
    //   // Get business from id
    //   this.vendorService.getBusinessById(this.business_id).subscribe(bus => {
    //     if (bus.success) {
    //       const b_obj = bus.msg[0];
    //       this.business_type = bus.msg[0].type;
    //       this.business_name = b_obj.business.name;
    //       this.title.setTitle(this.business_name);
    //     }else {
    //       // something went wrong
    //       console.log(bus);
    //     }
    //   });
    // });
  }

  confirmation(confirmation){
    console.log(this.orders[0]._id);
    const data = {
      id: this.orders[0]._id,
      confirmation: confirmation
    }
    this.vendorService.confirmation(data).subscribe(confirmation => {
      console.log(confirmation);
      
    });
  }

}
