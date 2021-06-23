import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-docs-language-view',
  templateUrl: './docs-intro-view.component.html',
  styleUrls: ['./docs-intro-view.component.css']
})
export class DocsIntroViewComponent {

  constructor(private router: Router) { }

  navigate(): void{
    this.router.navigateByUrl('/docs-view/(intro:language)');
  }

}
