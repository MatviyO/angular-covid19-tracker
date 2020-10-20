import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GlobalDataSummary} from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-17-2020.csv`;
  private dateWiseDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
  constructor(private http: HttpClient) { }

  getGlobalData(): any {
    return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
      map(res => {
        const data: GlobalDataSummary[] = [];
        const raw = {};
        const rows = res.split('\n');
        rows.splice(0, 1);
        rows.forEach(row => {
          const cols = row.split(/,(?=\S)/);
          const cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10]
          };
          const temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.active + temp.confirmed;
            temp.deaths = cs.active + temp.deaths;
            temp.recovered = cs.active + temp.recovered;
            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
        });
        return Object.values(raw) as GlobalDataSummary[];
      })
    );
  }
}
