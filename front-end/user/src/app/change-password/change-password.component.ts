import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import {ValidateService} from '../services/validate.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  opwd: any;
  npwd: any;
  cnpwd: any;
  user: any = [];
  constructor( private userService: UserService, private auth: AuthService, private validateservice: ValidateService) { }

  ngOnInit() {
    this.user =  JSON.parse(this.auth.getUserFromLocal());
  }
  chengePwd(){
    if(this.validateservice.validateInput(this.opwd) && this.validateservice.validateInput(this.npwd) && this.validateservice.validateInput(this.cnpwd)){
      if(this.validateservice.compareInputs(this.npwd, this.cnpwd)){
        const data = {
          opwd: this.opwd,
          npwd: this.npwd,
          cnpwd: this.cnpwd,
          mobile: this.user.mobile
        };
        this.userService.changePwd(data).subscribe(res => {
          console.log(res);
          if(res.status){
            alert(res.msg);
          } else {
            alert(res.msg);
          }
        });
      } else {
        alert('new password and confirm new password not matched');
      }
      
    } else {
      alert('You have to fill the all fields');
    }
    

  }
}
