import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { GlobalDataSummary } from 'src/app/shared/global-data-summary.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0;
  totalDeaths =  0;
  totalRecovered = 0;
  totalActive = 0;

  countries : string[] = [];
  data: GlobalDataSummary[] = [];
  constructor(private httpclient: DataServiceService) { }

  ngOnInit(): void {
    this.httpclient.getGlobalData().subscribe(
      result => {
        this.data = result;
        //this.data.sort((a,b) => a.country.localeCompare(b.country));
        result.sort();
        //result.reverse();

        result.forEach(row => {
          this.countries.push(row.country);
        });
      }
    )
    this.countries = this.countries.sort();
    //this.countries.sort((a,b) => a.localeCompare(b));
  }

  onChangeCountry(value) {
    this.data.forEach(row => {
      if(row.country == value) {
        this.totalConfirmed = row.confirmed;
        this.totalDeaths = row.deaths;
        this.totalRecovered = row.recovered;
        this.totalActive = row.active;
      }
    })
  }
}
