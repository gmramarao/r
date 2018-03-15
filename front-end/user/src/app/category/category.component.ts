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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cat_name = params['cat_name'];
      // this.use
    });
  }  

}
