import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {concatAll, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  configUrl = 'https://dog.ceo/api/breed/dogbr/images';
  imgArr = [];
  imgCounter = 0;
  private src: string;
  private myimg = new BehaviorSubject(this.src);

  obs1 = this.activatedRoute.queryParams;
  imageList = this.obs1.pipe(
    map(val => this.getConfig(this.configUrl, val)),
    concatAll()
  );
  getConfig(url, val) {
    const re = /dogbr/gi;
    const newstr = url.replace(re, val.debug);
    return this.http.get(newstr);
  }

  nextImg() {
    if (this.imgCounter <= (this.imgArr.length - 1)) {
      this.imgCounter++;
      this.myimg = this.imgArr[this.imgCounter];
    }
  }

  prevImg() {
    if (this.imgCounter > 0) {
      this.imgCounter--;
      this.myimg = this.imgArr[this.imgCounter];
    }
  }
  ngOnInit() {
    const subscribe = this.imageList.subscribe(val => {
        console.log('Example with Basic Observable:', val['message'][0]);
        this.myimg = val['message'][0];
        this.imgCounter = 0;
        this.imgArr = val['message'].splice(0);
      }
    );
  }


}
