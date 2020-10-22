import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data1: GlobalDataSummary[];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData: DateWiseData[];
  dateWiseData ;
  loading = true;
  datatable = [];
  chart = {
    LineChart : 'LineChart',
    height: 800,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
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
        this.data1 = result;
        this.data1.forEach(cs => {
          this.countries.push(cs.country);
        });
      }))
    ).subscribe(
      {
        complete : () => {
          setTimeout(() => {
            this.updateValues('India');
          });
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      }
    );
  }

  updateChart(): any {
    // this.datatable.push(['Cases' , 'Date']);
    this.selectedCountryData.forEach(cs => {
      const value: number = cs.cases;
      console.log(value);
      this.datatable.push([value, cs.date ]);
    });
  }

  updateValues(country: string): any {
    this.data1.forEach(cs => {
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
