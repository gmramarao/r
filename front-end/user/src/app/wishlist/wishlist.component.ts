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
    this.getWishList();
    // Get user business wishlist
    

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

  removeFromFavorites(_id){
    const data = {
      business_id: _id,
      user_id: this.user_id
    }
    this.userService.removeBusinessInWishlist(data).subscribe(res => {

      if(res.success){
        this.getWishList();
      } else {

      }
    })
  }
  getWishList(){
    this.businesses = [];
    this.userService.getUserBusinessWishlist(this.user_id).subscribe(res => {
      if(res.success){
        for(var i in res.msg){
          this.userService.getBusinessById(res.msg[i].business_id).subscribe((res)=>{
            if(res.success){
              console.log(res);
              this.businesses[i] = res.msg[0];
            }
          })
        }
      }
      console.log(res);
    });

  }

}
