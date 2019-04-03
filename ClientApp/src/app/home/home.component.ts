import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  result: Object;
  pageLists: Array<Object>;
  pageFilter: string;
  postLists: Array<Object>;
  postFilter: string;
  isTimer: boolean = false;
  interval: number = 60;
  timerInterval: any;
  http: HttpClient;
  baseUrl: string;
  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.getPageLists(http, baseUrl);
    this.getPostLists(http, baseUrl);
    this.pageFilter = "all";
    this.postFilter = "all";
  }
  ngOnInit() {
    // this.timerInterval = setInterval(() => {
    //   this.fetchPost();
    // }, this.interval);
  }
  fetchPost() {
    this.http.get(this.baseUrl + "api/Home/GetTimerInterval").subscribe(
      result => {
        let timeInterval = result["timerInterval"];
        console.log("-----", timeInterval);
        this.interval = 60000 * parseInt(timeInterval);
        this.timerInterval = this.timerInterval = setInterval(() => {
          this.getPageLists(this.http, this.baseUrl);
        }, this.interval);
        this.getPostLists(this.http, this.baseUrl);
      },
      error => console.error(error)
    );
  }
  setTimerValue(evt) {}
  getTimer() {
    this.http.get(this.baseUrl + "api/Home/GetTimerInterval").subscribe(
      result => {
        let timeInterval = result["timerInterval"];
        console.log("-----", timeInterval);
        this.interval = 1000 * parseInt(timeInterval);
      },
      error => console.error(error)
    );
  }

  getPageLists(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    http.get(baseUrl + "api/Home/GetWPContent?page=pages").subscribe(
      result => {
        let obj = result;
        let tmp = [];
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            tmp.push({
              id: obj[key].id,
              text: obj[key]["title"]["rendered"],
              content: obj[key]["content"]["rendered"]
            });
          }
        }
        this.pageLists = tmp;
      },
      error => console.error(error)
    );
  }
  Existing() {
    this.isTimer = !this.isTimer;
    clearInterval(this.timerInterval);
    if (this.isTimer) {
      this.fetchPost();
    }
  }
  getPostLists(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    http.get(baseUrl + "api/Home/GetWPContent?page=posts").subscribe(
      result => {
        let obj = result;
        console.log(obj);

        let tmp = [];
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            tmp.push({
              id: obj[key].id,
              text: obj[key]["title"]["rendered"],
              content: obj[key]["content"]["rendered"]
            });
          }
        }
        this.postLists = tmp;
      },
      error => console.error(error)
    );
  }
  onChangePage(keyword) {
    this.pageFilter = keyword;
  }
  onChangePost(keyword) {
    this.postFilter = keyword;
  }
}
