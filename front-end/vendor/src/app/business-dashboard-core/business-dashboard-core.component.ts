import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { VendorService } from '../services/vendor.service';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
const moment = require('moment');
declare var $: any;
@Component({
  selector: 'app-business-dashboard-core',
  templateUrl: './business-dashboard-core.component.html',
  styleUrls: ['./business-dashboard-core.component.css']
})
export class BusinessDashboardCoreComponent implements OnInit {
  status;
  vendor;
  today;
  b_id;
  constructor(private auth: AuthService, private vendorService: VendorService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    const date = new Date();
    this.b_id = this.vendorService.getb_id();
    this.today = this.datePipe.transform(date, 'EEEE').toLowerCase();
    this.vendor = JSON.parse(localStorage.getItem('user'));
    console.log(this.vendor);
    this.get_business();
  }
  
  status_change(){
    console.log('hello'+ this.status);
    const data ={
      business_id: this.b_id,
      status: this.status ? 'open' : 'close',
      updated_date: moment().add(12, 'hour').format('MMMM Do YYYY, h:mm:ss a')
    };
    this.vendorService.changeBusinesStatus(data).subscribe(res=>{
      console.log(res);
      this.get_business();
      if(res.success){
        
      } else {

      }
    })
  }
  get_business(){
    this.vendorService.getBusinesses(this.b_id).subscribe(bus => {
      console.log(bus);
      if(bus.success){
        if(bus.msg[0]){
          console.log(bus.msg[0]);
          this.status = (bus.msg[0].status) === 'open' ? true: false;
        } else {
          // bus.msg[1].forEach(element => {
          //   if (element.business.days[this.today]) {
          //     const opening_time = element.business.timings[this.today].opening;
          //     const closing_time = element.business.timings[this.today].closing;
          //     const open = moment(opening_time, 'h:mma');
          //     const close = moment(closing_time, 'h:mma');
          //     const cur_time = moment(new Date());
          //     let status;
          //     if (cur_time.isAfter(open)) {
          //       if (cur_time.isBefore(close)) {
          //         this.status = 'open';
          //       } else {
          //         this.status = 'close';
          //       }
          //     } else {
          //       this.status = 'close';
          //     }
          //     element.status = status;
          //   }else {
          //     // closed
          //     element.status = this.status;
          //   }
          // });
          if(bus.msg[1].business.days[this.today]){
            const opening_time = bus.msg[1].business.timings[this.today].opening;
            const closing_time = bus.msg[1].business.timings[this.today].closing;
            const open = moment(opening_time, 'h:mma');
            const close = moment(closing_time, 'h:mma');
            const cur_time = moment(new Date());
            let status;
            if (cur_time.isAfter(open)) {
              if (cur_time.isBefore(close)) {
                status = 'open';
              } else {
                  status = 'close';
              }
            } else {
              status = 'close';
            }
            this.status = status === 'open' ? true : false;
          }else {
            this.status = false;
          }
        }
      } else {

      }
        
    });
  }
  
  
}
