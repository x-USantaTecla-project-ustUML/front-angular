import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.css']
})
export class PackageViewComponent {
  @Input() USTUML: string;

}
