import {Component, Input, OnChanges} from '@angular/core';
import {encode64} from './base64-encoder';
import pako from 'pako';
import {ExpandedImageComponent} from '../dialogs/expanded-image/expanded-image.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {mouseWheelZoom} from 'mouse-wheel-zoom';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-diagram-view',
  templateUrl: './diagram-view.component.html',
  styleUrls: ['./diagram-view.component.css']
})
export class DiagramViewComponent implements OnChanges {

  @Input() plantUML: string;
  diagramRoute: string;
  svgFileUrl: SafeResourceUrl;
  pngFileUrl: SafeResourceUrl;

  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.setDiagramRoutes();
    const wz = mouseWheelZoom({
      element: document.querySelector('[data-wheel-zoom]'),
      zoomStep: .4
    });
    wz.setSrc(this.diagramRoute);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      src: this.diagramRoute
    };
    this.dialog.open(ExpandedImageComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

  onError(): void {
    this.plantUML = 'skinparam Handwritten true\n' +
      'skinparam DefaultTextAlignment center\n' +
      'skinparam NoteBackgroundColor lightyellow\n' +
      'skinparam NoteBorderColor darkgray\\n\' +\n' +
      'note "This member is too big for PlantUML to draw a diagram." as tbd';
    this.setDiagramRoutes();
  }

  setDiagramRoutes(): void {
    if (this.plantUML === ''){
      this.plantUML = 'skinparam Handwritten true\n' +
        'skinparam DefaultTextAlignment center\n' +
        'skinparam NoteBackgroundColor lightyellow\n' +
        'skinparam NoteBorderColor darkgray\\n\' +\n' +
        'note "Introduce this command to create yout first project:\\n\\nadd:\\n  members:\\n    - project: MyProject\\n\\n ' +
        'or generate it automatically by importing your git repository:\\n\\nimport: https://github.com/USantaTecla-tool-ustUML/back-spring\\n' +
        ' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\\n' +
        'Requirements to import: the project has to be java, be stored in a \\npublic repository and it\'s main path has to be src/main/java" as tbd';
    }
    this.diagramRoute = 'https://www.plantuml.com/plantuml/svg/~1' + encode64(pako.deflate(this.plantUML, {level: 9}));
    this.toDataURL(this.diagramRoute).then((response) => {
      this.svgFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response);
    });
    this.toDataURL(this.diagramRoute.replace('svg', 'png')).then((response) => {
      this.pngFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response);
    });
  }

  toDataURL(url): Promise<string> {
    return fetch(url).then((response) => {
      return response.blob();
    }).then(blob => {
      return window.URL.createObjectURL(blob);
    });
  }

}
