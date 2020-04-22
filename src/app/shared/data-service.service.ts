import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import { GlobalDataSummary } from './global-data-summary.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-21-2020.csv";

  constructor(private httpClient: HttpClient) { }

  getGlobalData() {
    return this.httpClient.get(this.globalDataUrl, { responseType : 'text'}).pipe(
      map( result => {
        let rows = result.split("\n");
        let data = {}
        rows.splice(0,1);
        rows.forEach( row => {
          let cols = row.split(/,(?=\S)/)
          let countries = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10]
          };
          let temp : GlobalDataSummary = data[countries.country];
          if (temp) {
            temp.confirmed = temp.confirmed + countries.confirmed;
            temp.deaths = temp.deaths + countries.deaths;
            temp.recovered = temp.recovered + countries.recovered;
            temp.active = temp.active + countries.active;

            data[countries.country] = temp;
          } else {
            data[countries.country] = countries;
          }
        });
        return <GlobalDataSummary[]>Object.values(data);
      })
    );
  }
}
