import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data-service.service';
import {GlobalDataSummary} from '../../models/global-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
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
}
