import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  constructor(private title: Title, private adminService: AdminService, private route: ActivatedRoute) { }

  // Vendor Dets
  vendor_id;
  vendor_name;
  vendor_email;
  vendor_mobile;

  // Business Dets
  business_id;
  business_name;
  business_type;
  business_plan;
  business_reg_time;
  business_address;

  // Business days
  monday;
  tuesday;
  wednesday;
  thursday;
  friday;
  saturday;
  sunday;

  // Business timings
  monday_open;
  tuesday_open;
  wednesday_open;
  thursday_open;
  friday_open;
  saturday_open;
  sunday_open;
  monday_close;
  tuesday_close;
  wednesday_close;
  thursday_close;
  friday_close;
  saturday_close;
  sunday_close;

  // Contact dets
  contact_name;
  contact_mobile;
  contact_email;

  vendor_reg_time;
  sendMessageToVendorClicked;
  deleteVendorClicked;
  confirmPauseClicked;
  cancelPauseClicked;
  confirmDeleteClicked;
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      // alert(params['id']);
      this.business_id = params['id'];
      // Get business from id
      this.adminService.getBusniessById(this.business_id).subscribe(res => {
        if (res.success) {
          // Assigning values
          // Vendor details
          this.vendor_id = res.msg[0].vendor_id;
          // Getting vendor details from id
          this.adminService.getVendorById(this.vendor_id).subscribe(v => {
            if (v.success) {
              this.vendor_name = v.msg[0].name;
              this.vendor_email = v.msg[0].email;
              this.vendor_mobile = v.msg[0].mobile;
            }else {
              alert('Something went wrong');
            }
          });
          // Business details
          this.business_name = res.msg[0].business.name;
          this.business_type = res.msg[0].business.type;
          this.business_plan = res.msg[0].business.plan;
          this.business_address = res.msg[0].business.address;
          this.business_reg_time = res.msg[0].created_date;
          // Business days
          // Business_timings
          this.monday_open = res.msg[0].business.timings.monday.opening;
          this.tuesday_open = res.msg[0].business.timings.tuesday.opening;
          this.wednesday_open = res.msg[0].business.timings.wednesday.opening;
          this.thursday_open = res.msg[0].business.timings.thursday.opening;
          this.friday_open = res.msg[0].business.timings.friday.opening;
          this.saturday_open = res.msg[0].business.timings.saturday.opening;
          this.sunday_open = res.msg[0].business.timings.sunday.opening;

          this.monday_close = res.msg[0].business.timings.monday.closing;
          this.tuesday_close = res.msg[0].business.timings.tuesday.closing;
          this.wednesday_close = res.msg[0].business.timings.wednesday.closing;
          this.thursday_close = res.msg[0].business.timings.thursday.closing;
          this.friday_close = res.msg[0].business.timings.friday.closing;
          this.saturday_close = res.msg[0].business.timings.saturday.closing;
          this.sunday_close = res.msg[0].business.timings.sunday.closing;

          // Contact details
          this.contact_name = res.msg[0].contact_name;
          this.contact_mobile = res.msg[0].contact_mobile;
          this.contact_email = res.msg[0].contact_email;

        }else {
          alert('Something went wrong');
          console.log(res);
        }
      });
    });
  }
  pauseBusinessClicked() {
    // this.business
    this.adminService.pauseBusiness(this.business_id).subscribe(res => {
      console.log(res);
      if (res.success) {
        alert('success');
      }else {
        alert('failed');
      }
    });
  }

}
