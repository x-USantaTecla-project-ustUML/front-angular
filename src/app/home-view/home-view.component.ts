import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {
  focus: any;
  focus1: any;

  constructor(private router: Router) { }

  navigate(url: string): void{
    this.router.navigateByUrl(url);
  }

}
