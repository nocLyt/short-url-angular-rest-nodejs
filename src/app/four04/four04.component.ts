import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-four04',
  templateUrl: './four04.component.html',
  styleUrls: ['./four04.component.css']
})

export class Four04Component implements OnInit {

  returnedShortURL: string ="";

  URL_PRE : string ="http://s.noclyt.com/api/s/"; // 这个应该写到配置文件中去。

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit( ) {
    this.getShortURL();
  }

  getShortURL() :void {
    this.returnedShortURL = this.route.snapshot.paramMap.get('shortURL');
  }

}
