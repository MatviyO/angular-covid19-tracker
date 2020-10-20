import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data-service.service';
import {GlobalDataSummary} from '../../models/global-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  data: GlobalDataSummary[];
  countries: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(res => {
      this.data = res;
      this.data.forEach(cs => {
        this.countries.push(cs.country);
      });
    });
  }
  updateValue(country: string): any {
    this.data.forEach(cs => {
      if (cs.country === country) {
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      } else {

      }
    });
  }
}
