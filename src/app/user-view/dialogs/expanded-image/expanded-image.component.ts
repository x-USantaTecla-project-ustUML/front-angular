import {AfterViewInit, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {mouseWheelZoom} from 'mouse-wheel-zoom';

@Component({
  selector: 'app-expanded-image',
  templateUrl: './expanded-image.component.html',
  styleUrls: ['./expanded-image.component.css']
})
export class ExpandedImageComponent implements AfterViewInit {
  src: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.src = data.src;
  }

  ngAfterViewInit(): void {
    console.log(document.getElementById('dialog-img'));
    const wz = mouseWheelZoom({
      element: document.getElementById('dialog-img'),
      zoomStep: .4
    });
    wz.setSrc(this.src);
  }

}
