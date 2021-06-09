import {Component, Input, OnChanges} from '@angular/core';
import {encode64} from './base64-encoder';
import pako from 'pako';
import { mouseWheelZoom } from 'mouse-wheel-zoom';
import {ExpandedImageComponent} from '../dialogs/expanded-image/expanded-image.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-diagram-view',
  templateUrl: './diagram-view.component.html',
  styleUrls: ['./diagram-view.component.css']
})
export class DiagramViewComponent implements OnChanges {

  @Input() plantUML: string;
  diagramRoute: string;

  constructor(public dialog: MatDialog) {}

  ngOnChanges(): void {
    this.diagramRoute = 'https://www.plantuml.com/plantuml/svg/~1' + encode64(pako.deflate(this.plantUML, {level: 9})); // img para png
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
    dialogConfig.width = '100%';
    dialogConfig.height = '95%';
    this.dialog.open(ExpandedImageComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

}
