import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
declare var $: any;
const moment = require('moment');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private title: Title, private userService: UserService, private auth: AuthService, private datePipe: DatePipe) { }

  userId;
  main_cats;

  all_businesses = [];
  featured_businesses = [];
  today;
  section: any = 'product';
  categorie: any = [];
  ngOnInit() {

    const date = new Date();
    this.today = this.datePipe.transform(date, 'EEEE').toLowerCase();
    if (this.auth.loggedIn()) {
      const raw_user = localStorage.getItem('user');
      const user = JSON.parse(raw_user);
      this.userId = user.id;
      this.userService.updateTotalSiteVisits().subscribe(res => {
      });
    }else {
      this.userService.updateTotalSiteVisits().subscribe(res => {
        // console.log(res);
      });
    }
    // Get main menu from Admin
    this.userService.getMainCats().subscribe(res => {
      if (res.success) {
        this.main_cats = res.msg;
      }else {
        // alert('nope main cats');
      }
    });

    this.getCategories('product');
    

    // Get featured businesses
    this.userService.getFeaturedBusinesses().subscribe(buses => {
      if (buses.success) {
        const busses = buses.msg;
        buses.msg.forEach(element => {
          console.log(element.business_id);
          // Get business by id
          this.userService.getBusinessById(element.business_id).subscribe(b => {
            if (b.success) {
              let status, category;
              this.userService.getBusinessStatus(b.msg[0]._id).subscribe(b_stat => {
                if (b_stat.success) {
                  status = b_stat.msg;
                  if (status.length === 0) {
                    if (b.msg[0].business.days[this.today]) {
                      // Today shop is open
                      // Check for time
                      const opening_time = b.msg[0].business.timings[this.today].opening;
                      const closing_time = b.msg[0].business.timings[this.today].closing;
                      const open = moment(opening_time, 'h:mma');
                      const close = moment(closing_time, 'h:mma');
                      const cur_time = moment(new Date());
                      if (cur_time.isAfter(open)) {
                        if (cur_time.isBefore(close)) {
                          status = 'open';
                        } else {
                          status = 'close';
                        }
                      } else {
                        status = 'close';
                      }
                      b.msg[0].status = status;
                    }else {
                      // closed
                      b.msg[0].status = 'close';
                    }
                  }
                }else {
                  status = 'open';
                  b.msg[0].status = status;
                }
              });
              // Get category
              this.userService.getCatfromCatId(b.msg[0].business.category).subscribe(cat => {
                if (cat.success) {
                  category = cat.msg[0].name;
                  b.msg[0].cat = category;
                } else {
                }
              });
              this.featured_businesses.push(b.msg[0]);
            }
          });
        });
      }else {
          // something went wrong
          alert('Something went wrong');
      }
    });

    $('.cat-tab-products').click(function(){
      $('.cat-tab-title').removeClass('selected-cat-tab');
      $('.cat-tab-products').addClass('selected-cat-tab');
      $('.cat-tab-core').hide();
      $('.products-tab').show();
    });
    $('.cat-tab-services').click(function(){
      $('.cat-tab-title').removeClass('selected-cat-tab');
      $('.cat-tab-services').addClass('selected-cat-tab');
      $('.cat-tab-core').hide();
      $('.services-tab').show();
    });
    $('.cat-tab-individuals').click(function(){
      $('.cat-tab-title').removeClass('selected-cat-tab');
      $('.cat-tab-individuals').addClass('selected-cat-tab');
      $('.cat-tab-core').hide();
      $('.individuals-tab').show();
    });
  }

  getCategories(section){
    this.userService.getCategories(section).subscribe((res)=>{
      if(res.success){
        console.log(res);
        this.categorie = res.msg;
      } else {

      }
    })
  }

  state_change(state){
    console.log(state);
  }

}
