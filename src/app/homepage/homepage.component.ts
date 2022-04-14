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

  ngOnInit(): void {

    //this.calcpreviusDay();
    //this.getFutureGame(moment().format('YYYY-MM-DD'));
    this.getAllteamMethod()
    this.getPreviusDateGame(moment().format('YYYY-MM-DD'));

    this.menuList[1].active = true;

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
  gettodayGame(date: string) {
    this.callApiGames(
      (err: Error, data: any) => {
        if (err) {
          console.error(err);
        } else if (data) {
          for (let item in data.data) {
            //data.data[item].status = moment().utc(data.data[item].status).local().format('dddd hh:mm')
            let home_team =
              data.data[item].home_team.abbreviation.toLowerCase();
            let visitors_team =
              data.data[item].visitor_team.abbreviation.toLowerCase();
            data.data[item].home_team.logo =
              'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' +
              home_team +
              '.png';
            data.data[item].visitor_team.logo =
              'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' +
              visitors_team +
              '.png';
          }
          this.today = data.data.reverse();
        }
      },
      date,
      date
    );
  }

  getPreviusGame(date: any) {
    this.callApiGames(
      (err: Error, data: any) => {
        if (err) {
          console.error(err);
        } else if (data) {
          for (let item in data.data) {
            let home_team =
              data.data[item].home_team.abbreviation.toLowerCase();
            let visitors_team =
              data.data[item].visitor_team.abbreviation.toLowerCase();
            data.data[item].home_team.logo =
              'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' +
              home_team +
              '.png';
            data.data[item].visitor_team.logo =
              'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' +
              visitors_team +
              '.png';
          }
          this.previus = data.data.reverse();
        }
      },
      date,
      date
    );
  }
  callApiGames(callbackFn: Function, startdate: string, endDate: string) {
    const sub = this.http
      .get(
        `https://www.balldontlie.io/api/v1/games?start_date=${startdate}&end_date=${endDate}`
      )
      .subscribe({
        next: (data) => {
          callbackFn(null, data);
        },
        error: (err: Error) => {
          setTimeout(() => {
            callbackFn(err, null);
            sub.unsubscribe();
          });
        },
        complete: () => {
          setTimeout(() => {
            sub.unsubscribe();
          });
        },
      });
  }

  calcpreviusDay() {
    this.previusDay = this.actualDay = moment().format('YYYY-MM-DD');
    this.getPreviusGame(this.previusDay);
    this.gettodayGame(this.actualDay);
  }

  /**
   * The function getLogos takes in a callback function and a team name.
   * It then makes a GET request to the NBA API to get the team logo.
   * It then passes the data to the callback function.
   * The callback function then returns the data to the caller
   * @param {Function} callbackFn - Function,
   * @param {string} team - The team name.
   */
  getLogos(callbackFn: Function, team: string) {
    const sub = this.http
      .get(
        `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${team}.png`,
        {
          headers: new HttpHeaders().set('Content-Type', 'image/png'),
        }
      )
      .subscribe({
        next: (data) => {
          callbackFn(null, data);
        },
        error: (err: Error) => {
          setTimeout(() => {
            callbackFn(err, null);
            sub.unsubscribe();
          });
        },
        complete: () => {
          setTimeout(() => {
            sub.unsubscribe();
          });
        },
      });
  }
  redirectToTeam(team: any) {
    this.router.navigate(['team', team.id]);
  }

  navigate(item: any) {
    this.router.navigate([item.route]);
  }
  array: any = {};
  showGames = false;
  getFutureGame(date: string) {
    this.callApiGames(
      (err: Error, data: any) => {
        if (err) {
          console.error(err);
          this.showGames = true;
        } else if (data) {
          let nextDate = moment(date).add('days', 1).format('YYYY-MM-DD');
          if (data.data.length > 0) {
            /**
             * mettere le partite in un oggetto con chiave data e lista di partite
             * es: {
             * 2020-21-02:[{},{}]
             * 2020-21-02:[{},{}]
             * 2020-21-02:[{},{}]
             * 2020-21-02:[{},{}]
             * 2020-21-02:[{},{}]
             * }
             */
            this.array[nextDate] = [];
            for (let item of data.data) {
              this.array[`${nextDate}`].push({
                home_team_logo:
                  'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' +
                  item.home_team.abbreviation.toLowerCase(),
                visitor_team_logo:
                  'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' +
                  item.visitor_team.abbreviation.toLowerCase(),
                home_team: item.home_team.city,
                visitor_team: item.visitor_team.city,
                home_team_score: item.home_team_score,
                visitor_team_score: item.visitor_team_score,
                id_home_team: item.home_team.id,
                id_visitor_team: item.visitor_team.id,
                id_game: item.id,
                status: item.status,
              });
            }
            setTimeout(() => {
              this.getFutureGame(nextDate);
            });
          } else if (data.data.length == 0) {
            console.log(this.array);
            this.showGames = true;
            return;
          }
        }
      },
      date,
      date
    );
  }
  getPreviusDateGame(date: string) {
    this.callApiGames(
      (err: Error, data: any) => {
        if (err) {
          console.error(err);
          this.showGames = true;
        } else if (data) {
          let nextDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
          if (data.data.length > 0) {
            /**
             * mettere le partite in un oggetto con chiave data e lista di partite
             * es: {
             * 2020-21-02:[{},{}]
             * 2020-21-02:[{},{}]
             * 2020-21-02:[{},{}]
             * 2020-21-02:[{},{}]
             * 2020-21-02:[{},{}]
             * }
             */
            this.array[nextDate] = [];
            for (let item of data.data) {
              this.array[`${nextDate}`].push({
                home_team_logo:
                  'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' +
                  item.home_team.abbreviation.toLowerCase(),
                visitor_team_logo:
                  'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' +
                  item.visitor_team.abbreviation.toLowerCase(),
                home_team: item.home_team.city,
                visitor_team: item.visitor_team.city,
                home_team_score: item.home_team_score,
                visitor_team_score: item.visitor_team_score,
                id_home_team: item.home_team.id,
                id_visitor_team: item.visitor_team.id,
                id_game: item.id,
                status: item.status,
              });
            }

            setTimeout(() => {
              this.getPreviusDateGame(nextDate);
            });
          } else if (data.data.length == 0) {
            this.getFutureGame(moment().format('YYYY-MM-DD'));

            return;
          }
        }
      },
      date,
      date
    );
  }
}
