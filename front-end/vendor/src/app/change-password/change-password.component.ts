import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  old_pwd: any;
  new_pwd: any;
  r_new_pwd: any;
  user: any;
  constructor(private auth: AuthService, private validate: ValidateService, private router: Router, private title: Title) { }

  ngOnInit() {
    this.user = JSON.parse(this.auth.getUserFromLocal());
  }
  change_password(){
    if(this.validate.validateInput(this.old_pwd) && this.validate.validateInput(this.new_pwd) &&this.validate.validateInput(this.r_new_pwd)){
      if(this.validate.compareInputs(this.new_pwd, this.r_new_pwd)){
        const data ={
          old_pwd: this.old_pwd,
          new_pwd: this.new_pwd,
          mobile: this.user.mobile
        }
        this.auth.change_password(data).subscribe(cp_status => {
          console.log(cp_status);
          if (cp_status.success) {
            this.router.navigate(['/home']);
          }else {
            alert(cp_status.msg);
          }
        })
      } else {
        alert('new password and repeat new password not matched');
      }
    } else {
      alert('Please fill all fields');
    }
  }
}
