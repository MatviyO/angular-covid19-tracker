import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date: number;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.my();
    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (res) => {
          }
        }
      );
  }

  my(): void {
    this.date = Date.now();
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10)
    {
      // @ts-ignore
      dd = '0' + dd;
    }

    if (mm < 10)
    {
      // @ts-ignore
      mm =  '0' + mm;
    }
    // @ts-ignore
    today = dd + '-' + mm + '-' + yyyy;
    console.log(today);
  }

}
