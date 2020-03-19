import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/globals/globals.service';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {

  constructor(protected globals: GlobalsService) { }

  ngOnInit() {
  }

}
