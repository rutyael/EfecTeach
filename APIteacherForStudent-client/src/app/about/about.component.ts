import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private _location: Location) { }

    // back
    backClicked() {
      this._location.back();
    }

  ngOnInit(): void {
  }

}
