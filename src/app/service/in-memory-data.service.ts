import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const urls = [
      { id: 11, shortURL: "qq", longURL: "www.qq.com"},
      { id: 12, shortURL: "88", longURL: "www.88.com"},
      { id: 13, shortURL: "908", longURL: "www.908.com"},
      { id: 14, shortURL: "zevc", longURL: "www.zevc.com"},
      { id: 15, shortURL: "baidu", longURL: "www.baidu.com"},
    ];
    return {urls};
  }
}

