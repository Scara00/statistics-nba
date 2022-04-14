import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  public idTeamDetail: any
  constructor(
    public route: ActivatedRoute,
     public http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.getIdDatasetFromUrl()
    debugger
  }

  getIdDatasetFromUrl() {
    this.idTeamDetail = Number(this.route.snapshot.paramMap.get('id'))
    this.callApiTeam((err: Error, data: any) => {
      if (err) {
       console.error(err);
      } else if (data) {
        debugger
        console.log(data)
     }
   })
  }
  
  callApiTeam(callbackFn: Function) {
    const sub = this.http.get(`https://www.balldontlie.io/api/v1/teams/${this.idTeamDetail}`).subscribe({
      next: (data) => {
        callbackFn(null, data)
      },
      error: (err: Error) => {
        setTimeout(() => {
          callbackFn(err, null)
          sub.unsubscribe()
        });
      },
      complete: () => {
        setTimeout(() => {
          sub.unsubscribe()
        });
      }
    })
  }
}
