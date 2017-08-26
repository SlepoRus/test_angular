import { Component } from '@angular/core';
import { ApiService } from './shared';


import '../style/app.less';
@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title: string;
  model = [];
  count = 0;
  date = "0";
  status = "all";
  text = "";
  limit = 20;
  page = 1;
  pages = [];
  api = undefined;
  selectByDate(e) {
    this.date = e;
    this.resetData()
    this.search();
  }

  constructor(api: ApiService) {
          this.api = api;
          api.getData().done((val) => {
            this.model = val.data;
            this.count = val.count;
            this.getPages();
          });;
  }

  selectByOpen(e) {
    this.status = e;
    this.resetData()
    this.search();
  }

  selectByInput(e) {
    this.text = e;
    this.resetData()
    this.search();
  }

  resetData() {
    this.page = 1;
    this.limit = 20;
    this.pages = [];
  }

  getPages() {
    const PAGE_RANGE = 2, TOTAL_PAGES = 5;
    let total_pages = Math.ceil(this.count/this.limit),
        { page } = this,
        massive = [], i = page > PAGE_RANGE ? page - PAGE_RANGE : 1;
    while (total_pages >= i ) {
      massive.push({text: i, value: i});
      i++;
      if (massive.length == TOTAL_PAGES && page + 2 !== total_pages) {
        massive.push({text:'...', value:i + 1});
        massive.push({text:total_pages, value:total_pages});
        break;
      }
    }
    this.pages = massive;
  }


  changeLimit(e) {
    this.limit = e;
    this.page = 1;
    this.search();
  }

  changePage(e) {
    this.page = e;
    this.search();
  }

  search() {
    if (this.api)
    this.api.filterData(this).done((val) => {
      this.model = val.data;
      this.count = val.count;
      this.getPages();
    })
  }


}
