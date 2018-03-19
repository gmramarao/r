import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  name: any;
  email: any;
  mobile: any;
  address: any;
  gender: any;
  dob: any;
  user: any = [];
  constructor( private userService: UserService, private auth: AuthService) { }

  ngOnInit() {
   this.user =  JSON.parse(this.auth.getUserFromLocal());
   console.log(this.user);
   this.name = this.user.name;
   this.email = this.user.email;
   this.mobile = this.user.mobile;
  }
  profile_setting(){
    const data = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      address: this.address,
      gender: this.gender,
      dob: this.dob
    };
    console.log(data);
    this.userService.profileSetting(data).subscribe(res => {
      console.log(res);
      if(res.status){

      } else {

      }
    });
  }
}
