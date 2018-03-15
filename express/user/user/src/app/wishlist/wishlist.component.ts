import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private title: Title, private userService: UserService) { }

  user_id;
  businesses = [];
  items = [];

  ngOnInit() {
    const raw_user = localStorage.getItem('user');
    const user = JSON.parse(raw_user);
    this.user_id = user.id;

    // Get user business wishlist
    this.userService.getUserBusinessWishlist(this.user_id).subscribe(res => {
      console.log(res);
    });


    // Get user item wishlist
    // this.userService.getUserItemWishlist(this.user_id).subscribe(itemss => {
    //   if (itemss.success) {
    //     this.items = itemss.msg;
    //   }else {
    //     // Error occured
    //     console.log(itemss);
    //   }
    // });
  }

}
