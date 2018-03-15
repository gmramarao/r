import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-business-sub-header',
  templateUrl: './business-sub-header.component.html',
  styleUrls: ['./business-sub-header.component.css']
})
export class BusinessSubHeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private vendorService: VendorService) { }

    business_id;
    business_type;
    business_name;

  ngOnInit() {
    this.route.params.subscribe(params => {
      // alert(params['id']);
      this.business_id = params['id'];
      // Get business from id
      this.vendorService.getBusinessById(this.business_id).subscribe(bus => {
        if (bus.success) {
          const b_obj = bus.msg[0];
          this.business_type = bus.msg[0].type;
          this.business_name = b_obj.business.name;
        }else {
          // something went wrong
          console.log(bus);
        }
      });
    });
  }

}
