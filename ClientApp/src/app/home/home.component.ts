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
  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.getPageLists(http, baseUrl);
    this.getPostLists(http, baseUrl);
    this.pageFilter = "all";
    this.postFilter = "all";
  }
  ngOnInit() {}

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
  getPostLists(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    http.get(baseUrl + "api/Home/GetWPContent?page=posts").subscribe(
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
