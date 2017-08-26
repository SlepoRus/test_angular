import { Injectable } from '@angular/core';

var apiPrefix = "http://localhost:9090";
import * as $ from 'jquery';

@Injectable()
export class ApiService {
  getData() {
    return $.ajax({
      url: `${apiPrefix}/all`,
    })
  }
  filterData({ date, status, text, limit, page }) {
    return $.ajax({
      url: `${apiPrefix}/filter`,
      data: `date=${date}&status=${status}&text=${text}&limit=${limit}&page=${page}`
    })
  }
}
