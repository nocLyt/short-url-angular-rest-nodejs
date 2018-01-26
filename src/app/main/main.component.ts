import { Component, OnInit, Input} from '@angular/core';
import { UrlService } from '../service/url.service';
import { UrlPair }from '../template/urlPair'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  inputURL: string = "";
  @Input() returnedURLPair: UrlPair;

  constructor(
    private urlService: UrlService,
  ) { }

  ngOnInit() {

  }

  /**
   * 调用 http 请求，
   *
   */
  generateShortURL() :void {
    console.log("调用请求" + this.inputURL);
    // console.log(this.urlService.getShortURLByInputURL(this.inputURL));
    this.urlService.getReturnedURLPairByInputURL(this.inputURL).subscribe(
      UrlPair => this.returnedURLPair = UrlPair
      // UrlPair => console.log("Print out: " + UrlPair)
    )
  }


}
