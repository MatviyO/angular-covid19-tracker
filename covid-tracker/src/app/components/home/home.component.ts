import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data-service.service';
import {GlobalDataSummary} from '../../models/global-data';
import {GoogleChartInterface} from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  date: number;
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  };

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.my();
    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            this.globalData = res;
            res.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active;
                this.totalConfirmed += cs.confirmed;
                this.totalDeaths += cs.deaths;
                this.totalRecovered += cs.active;
              }
            });
            this.initChart();
          }
        }
      );
  }
  initChart(): void {
    const datatable = [];
    datatable.push(['Country', 'Cases']);
    this.globalData.forEach(cs => {
      datatable.push([ cs.country, cs.confirmed]);
    });
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      options: {'Country': 'Cases'}
    };

  }

  my(): void {
    this.date = Date.now();
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      // @ts-ignore
      dd = '0' + dd;
    }

    if (mm < 10) {
      // @ts-ignore
      mm = '0' + mm;
    }
    // @ts-ignore
    today = dd + '-' + mm + '-' + yyyy;
    console.log(today);
  }

}
