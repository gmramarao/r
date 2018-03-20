import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  user: any = [];
  constructor( private userService: UserService, private auth: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(this.auth.getUserFromLocal());
    console.log(this.user);
    this.userService.getOrders(this.user.id).subscribe((res)=>{
      if(res.status){
        console.log(res.msg);
      } else {
        console.log(res.msg);
      }
    })

  }

}
