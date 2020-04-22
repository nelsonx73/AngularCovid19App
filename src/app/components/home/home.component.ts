import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../shared/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(  private dataservice: DataServiceService ) { }

  totalConfirmed = 0;
  totalDeaths =  0;
  totalRecovered = 0;
  totalActive = 0;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataservice.getGlobalData()
    .subscribe({
        next: (result)=> {

          result.forEach( row => {
            if (!Number.isNaN(row.confirmed)) {
              this.totalActive += row.active;
              this.totalConfirmed += row.confirmed;
              this.totalRecovered += row.recovered;
              this.totalDeaths += row.deaths;
              }
            });
        }
      })
  }
}
