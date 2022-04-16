import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(public http: HttpClient, private router: Router) { }

  public today: any;
  public previus: any;
  public actualDay: any;
  public previusDay: any;
  public showFiller = false;
  public teamsList: any = []
  public menuList = [
    {
      title: 'Teams',
      icon: 'sports_basketball',
      active: false,
      route: 'team-list',
    },
    { title: 'Games', icon: 'sports', active: false, route: 'homepage' },
    { title: 'Players', icon: 'people', active: false, route: 'players-list' },
    { title: 'Rank', icon: 'leaderboard', active: false, route: 'rank-list' },
    { title: 'News', icon: 'newspaper', active: false, route: 'news' },
  ];

  public listOfGames = {};
  public numberOfcols = 3
  ngOnInit(): void {
    this.getAllteamMethod()
    this.menuList[1].active = true;
    this.numberOfcols = (window.innerWidth > 950) ? 4 : (window.innerWidth <= 850) ? (window.innerWidth <= 850) && (window.innerWidth >= 560) ? 2 : 1 : 3;
    window.innerWidth
  }
  onResize(event: any) {
    this.numberOfcols = (event.target.innerWidth > 950) ? 4 : (event.target.innerWidth <= 850) ? (event.target.innerWidth <= 850) && (event.target.innerWidth >= 560) ? 2 : 1 : 3;
  }


  redirectToTeam(team: any) {
    this.router.navigate(['team', team.id]);
  }

  /**
   * The function takes an item as a parameter, and then uses the Angular Router to navigate to the
   * route that is specified in the item
   * @param {any} item - any - This is the item that is passed in from the menu.component.html file.
   */
  navigate(item: any) {
    this.router.navigate([item.route]);
  }

  getAllteamMethod() {
    this.getAllteam((error: Error, data: any) => {
      if (error) {
        console.error(error)
      } else if (data) {
        for (let item of data.data) {
          item['logo'] = 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + item.abbreviation.toLowerCase() + '.png'
          this.teamsList.push(item)
        }
      }
    })
    console.log(this.teamsList)
  }

  /**
   * The function takes a callback function as an argument, and then calls that callback function with
   * either an error or the data from the API call
   * @param {Function} callbackFn - Function,
   */
  getAllteam(callbackFn: Function,) {
    const sub = this.http.get('https://www.balldontlie.io/api/v1/teams').subscribe({
      next: (data) => {
        callbackFn(null, data);
      },
      error: (error: Error) => {
        setTimeout(() => {
          callbackFn(error, null);
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
