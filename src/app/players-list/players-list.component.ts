import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import 'animate.css';
@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  constructor(
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getPlayers()
  }


  getPlayers() {
    this.getplayersapi((err:any,data:any) => {
      if (err) {
    
      console.error(err)
      } else if (data) {
        
        console.log(data)
    }
  })
}
  getplayersapi(callbackFn: Function){
    const sub=this.http.get(`https://www.balldontlie.io/api/v1/players?per_page=100`).subscribe({
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
