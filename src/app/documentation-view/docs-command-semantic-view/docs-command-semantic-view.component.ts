import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-docs-command-semantic-view',
  templateUrl: './docs-command-semantic-view.component.html',
  styleUrls: ['./docs-command-semantic-view.component.css']
})
export class DocsCommandSemanticViewComponent {

  constructor(private router: Router) { }

  navigate(url: string): void{
    this.router.navigateByUrl(url);
  }

}
