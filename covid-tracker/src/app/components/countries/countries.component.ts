import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import {GoogleChartInterface} from 'ng2-google-charts';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data: GlobalDataSummary[];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData: DateWiseData[];
  dateWiseData ;
  loading = true;
  lineChart: GoogleChartInterface = {
    chartType: 'LineChart'
  };

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {

    merge(
      this.service.getDateWiseData().pipe(
        map(result => {
          this.dateWiseData = result;
        })
      ),
      this.service.getGlobalData().pipe(map((result: any) => {
        this.data = result;
        this.data.forEach(cs => {
          this.countries.push(cs.country);
        });
      }))
    ).subscribe(
      {
        complete : () => {
         this.updateValues('India');
         this.loading = false;
        }
      }
    );
  }

  // updateChart(): any {
  //   this.dataTable.push(['Date' , 'Cases']);
  //   this.selectedCountryData.forEach(cs => {
  //     this.dataTable.push([cs.date , cs.cases]);
  //     console.log(this.dataTable);
  //   });
  // }

  updateValues(country: string): any {
    this.data.forEach(cs => {
      if (cs.country === country){
        this.totalActive = cs.active;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
        this.totalConfirmed = cs.confirmed;
      }
    });

    this.selectedCountryData  = this.dateWiseData[country];
    this.updateChart();
  }
}
