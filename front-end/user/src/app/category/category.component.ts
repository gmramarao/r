import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private title: Title, private userService: UserService) { }

  cat_name;
  subcategories: any = [];
  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.cat_name = params['cat_name'];
      this.userService.getSubCategorie(params['cat_name']).subscribe((res)=>{
        console.log(res);
        if(res.success){
          this.cat_name = res.msg[0].name;
          this.subcategories = res.msg[1];
          console.log(this.subcategories);
        } else {

        }
      })
      // this.use
    });
  }  

}
