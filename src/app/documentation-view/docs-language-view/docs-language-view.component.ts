import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-docs-introduction-view',
  templateUrl: './docs-language-view.component.html',
  styleUrls: ['./docs-language-view.component.css']
})
export class DocsLanguageViewComponent {

  constructor(private router: Router) { }

  navigate(url: string): void{
    this.router.navigateByUrl(url);
  }

}
