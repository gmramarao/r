import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { VendorService } from '../services/vendor.service';
import { Router, CanActivate } from '@angular/router';
@Component({
  selector: 'app-visitor-analysis',
  templateUrl: './visitor-analysis.component.html',
  styleUrls: ['./visitor-analysis.component.css']
})
export class VisitorAnalysisComponent implements OnInit {
  b_id;
  visitors: any = {};
  constructor(private auth: AuthService, private vendorService: VendorService, private router: Router) { }

  ngOnInit() {
    this.b_id = this.vendorService.getb_id();
    this.vendorService.getVisitorAnalysis(this.b_id).subscribe((res)=>{
      console.log(res);
      if(res.success){
        this.visitors = res.msg;
      }
      
    })
  }

}
