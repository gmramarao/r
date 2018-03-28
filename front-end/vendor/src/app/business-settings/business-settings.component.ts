import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-business-settings',
  templateUrl: './business-settings.component.html',
  styleUrls: ['./business-settings.component.css']
})
export class BusinessSettingsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private vendorService: VendorService,
    private title: Title) { }

    b_id;
    business_name;
    business_number;
    business_location;
    business_status;
    vendor_id;
    business_type;
    business: any = [];

  ngOnInit() {
    const vendor_obj = JSON.parse(localStorage.getItem('user'));
    this.vendor_id = vendor_obj.id;
    this.b_id = this.vendorService.getb_id();
    console.log(this.b_id);
    this.getBusiness();
    // this.route.params.subscribe(params => {
    //   // alert(params['id']);
    //   this.business_id = params['id'];
    //   console.log(this.business_id);
    //   // Get business from id
    //   this.vendorService.getBusinessById(this.business_id).subscribe(bus => {
    //     if (bus.success) {
    //       this.business_type = bus.msg[0].type;
    //       const b_obj = bus.msg[0];
    //       this.business_name = b_obj.business.name;
    //       this.title.setTitle(this.business_name);
    //     }else {
    //       // something went wrong
    //       console.log(bus);
    //     }
    //   });
    // });
    


  }

  getBusiness(){
    this.vendorService.getBusinessById(this.b_id).subscribe((res)=>{
      if(res.success){
        this.business = res.msg[0];
        if(this.business){
          this.business_name = this.business.business.name;
          this.business_number = this.business.business.contact_number;
          this.business_location =  this.business.business.address;
        }
        console.log(this.business);
      } else {

      }
    })
  }
  business_settings(){
    const data = {
      name : this.business_name,
      contact_number: this.business_number,
      address: this.business_location,
      id: this.b_id
    }
    this.vendorService.business_status_change(data).subscribe((res)=>{
      console.log(res);
      if(res.success){
        this.getBusiness();
      } else {

      }
    })
      
  }

}
