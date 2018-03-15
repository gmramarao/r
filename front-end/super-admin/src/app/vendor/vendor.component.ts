import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
declare var $: any;

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  constructor(private title: Title, private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  vendor_id;
  vendor_name;
  vendor_email;
  vendor_mobile;
  vendor_reg_time;
  vendor_last_login;
  vendor_paused_status;
  vendor_approve_status;

  ngOnInit() {
    this.route.params.subscribe(params => {
      // alert(params['id']);
      this.vendor_id = params['id'];
      // Get vendor from id
      this.adminService.getVendorById(this.vendor_id).subscribe(ven => {
        if (ven.success) {
          // Display vendor
          this.vendor_name = ven.msg[0].name;
          this.vendor_email = ven.msg[0].email;
          this.vendor_mobile = ven.msg[0].mobile;
          this.vendor_reg_time = ven.msg[0].registered_time;
          this.vendor_last_login = ven.msg[0].last_login_time;
        }else {
          // error
          alert('Something went wrong');
        }
      });
    });
  }
  cancelPauseClicked() {
    $('.db').hide();
    $('.wb').hide();
  }
  sendMessageToVendorClicked() {
    $('.db').css({ 'display': 'flex' });
    $('.msg-wb').css({ 'display': 'flex' });
  }
  pauseVendorClicked() {
    $('.db').css({ 'display': 'flex' });
    $('.pause-wb').css({ 'display': 'flex' });
    this.adminService.pauseVendor(this.vendor_id).subscribe(res => {
      // res
    });
  }
  deleteVendorClicked() {
    $('.db').css({ 'display': 'flex' });
    $('.delete-wb').css({ 'display': 'flex' });
  }
  // viewVendorProfile() {
  //   // redirect to www.reatchall.com/business/:id
  //   this.router.navigateByUrl('https://localhost:4400/business' + this.business_id);
  // }

}
