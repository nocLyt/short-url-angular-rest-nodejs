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
  errorMessage: string ="";

  @Input() returnedURLPair: UrlPair;

  clearErrorMessage(): void {
    this.errorMessage = "";
  }

  constructor(
    private urlService: UrlService,
  ) { }

  ngOnInit() {

  }

  /**
   * 判断 url 是否有 协议头
   * 这里只判断 http https ftp ftps 四个协议头
   *
   * @param url
   */
  hasProtocalHeader(url: string) :boolean {
    var re = /^((ht|f)tps?):\/\/.*/;
    return re.test(url);
  }

  /**
   * 为没有协议类型的 url 添加 http:// 协议类型
   * 如果有，则不做处理
   *
   * @param url
   */
  wrapProtocalHeader(url: string) :string {
    if (this.hasProtocalHeader(url)) {
      return url;
    }
    return "http://" + url;
  }

  /**
   * 根据输入的 URL，生成短 URL。
   *
   * 输入不合法出错则在首页展示错误信息 this.errorMEssage
   * 生成短 URL 成功后，在首页展示返回结果。
   *
   */
  generateShortURL() :void {
    // console.log(this.inputURL);
    var inputURL = this.inputURL.trim()
    //
    if (inputURL === "") {
      this.errorMessage = "Please don't input empty!";
      this.inputURL = "";  // 清空文本框
      return
    } else {
      this.clearErrorMessage();
    }
    // 判断 inputURL 是否有协议类型，如果没有则添加 http://
    inputURL = this.wrapProtocalHeader(inputURL);

    // // console.log(this.urlService.getShortURLByInputURL(this.inputURL));
    this.urlService.getReturnedURLPairByInputURL(inputURL).subscribe(
      UrlPair => this.returnedURLPair = UrlPair
    )
  }


}
