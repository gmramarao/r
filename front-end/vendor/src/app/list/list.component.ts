import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private vendorService: VendorService, private title: Title) { }

  business_id;
  list_id;
  list_name;
  items = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.business_id = params['id'];
      this.list_id = params['list_id'];
      // Get list details
      this.vendorService.getListDetails(this.list_id).subscribe(l => {
        if (l.success) {
          this.list_name = l.msg[0].list_name;
          this.title.setTitle(this.list_name + ' View and Edit List');
        }else {
          // error occured
          console.log(l);
        }
      });
      // Get items of list
      this.vendorService.getListItems(this.list_id).subscribe(i => {
        console.log(i);
        if (i.success) {
          this.items = i.msg;
        }else {
          // error
        }
      });
    });
  }

  removeFromListClicked(item_id) {

  }
  deleteItemClicked(item_id) {

  }
  movetoAnotherListClicked(item_id) {

  }

}
