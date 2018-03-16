import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  mobile;
  otp;
  i_otp;
  otp_verify: Boolean;
  n_pwd;
  constructor(private auth: AuthService, private validate: ValidateService, private router: Router, private title: Title) { }

  ngOnInit() {
  }
  requestVerification() {
    if (this.validate.validateMobile(this.mobile)) {
      this.auth.requestVerification(this.mobile).subscribe(req_ver => {
        console.log(req_ver);
        if (req_ver.success) {
          this.otp = req_ver.msg.otp;
        } else {
          alert(req_ver.msg);
        }
      });
    } else {
      alert('Invalid mobile number')
    }
  }
  verifyCode(){
    const data ={
      mobile : this.mobile,
      otp: this.i_otp
    }
    this.auth.verifyCode(data).subscribe(req_ver => {
      console.log(req_ver);
      if (req_ver.success) {
        this.otp_verify = true;
      } else {
        alert(req_ver.msg);
      }
    });
  }
  resetPwd(){
    const data ={
      mobile : this.mobile,
      pwd: this.n_pwd,
      otp: this.i_otp
    }
    this.auth.resetPwd(data).subscribe(req_ver => {
      console.log(req_ver);
      if (req_ver.success) {
        this.router.navigate(['/login']);
      } else {
        alert(req_ver.msg);
      }
    });
  }
}
