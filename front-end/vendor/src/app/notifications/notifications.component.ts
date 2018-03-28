import { Component, OnInit } from '@angular/core';
import { VendorService } from '../services/vendor.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  orders: any = [];
  get_notification: number = 4000;
  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.vendorService.getNotification('123').subscribe(order => {
      if (order.success) {
        this.orders = order.msg;
      }
    });
    setInterval(()=> {
      this.vendorService.getNotification('123').subscribe(order => {
        if (order.success) {
          this.orders = order.msg;
        }
      });
     },this.get_notification); 
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
