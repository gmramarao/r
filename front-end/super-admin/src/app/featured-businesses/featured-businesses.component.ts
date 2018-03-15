import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-featured-businesses',
  templateUrl: './featured-businesses.component.html',
  styleUrls: ['./featured-businesses.component.css']
})
export class FeaturedBusinessesComponent implements OnInit {

  constructor(private title: Title, private adminService: AdminService) { }

  businesses = [];

  ngOnInit() {
    this.title.setTitle('Featued Businesses');

    this.adminService.getAllBusniesses().subscribe(b => {
      if (b.success) {
        // this.businesses = b.msg;
        b.msg.forEach(element => {
          // check if featured
          this.adminService.checkIfFeatured(element._id).subscribe(f => {
            if (f.success) {
              if (f.msg.length > 0) {
                // featured
                element.isAdded = true;
              }else {
                // not featured
                element.isAdded = false;
              }
            }else {
              // error occured
              console.log(f);
            }
          });
          this.adminService.getVendorById(element.vendor_id).subscribe(v => {
            if (v.success) {
              element.vendor = v.msg[0].name;
            }else {
              // Error
              console.log(v);
            }
          });
          this.businesses.push(element);
        });
      }else {
        // error
        console.log(b);
      }
    });
  }
  checkChanged(event, id) {
    switch (event.target.checked) {
      case true:
        // Add to featured Businesses
        this.adminService.addFeaturedBusinesses(id).subscribe(added => {
          if (added.success) {
            alert('Added');
          }else {
            alert('Something went wrong');
            console.log(added);
          }
        });
        break;
      case false:
        // Remove featured Businesses
        this.adminService.removeFeaturedBusinesses(id).subscribe(rem => {
          if (rem.success) {
            alert('Removed as featured Business');
          }else {
            alert('Something went wrong');
            console.log(rem);
          }
        });
        break;
      default:
        break;
    }
  }

}
