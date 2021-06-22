import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-docs-direct-engineering-view',
  templateUrl: './docs-direct-engineering-view.component.html',
  styleUrls: ['./docs-direct-engineering-view.component.css']
})
export class DocsDirectEngineeringViewComponent {

  constructor(private router: Router) { }

  navigate(url: string): void{
    this.router.navigateByUrl(url);
  }

}
