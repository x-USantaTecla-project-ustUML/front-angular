import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {mouseWheelZoom} from 'mouse-wheel-zoom';

@Component({
  selector: 'app-expanded-image',
  templateUrl: './expanded-image.component.html',
  styleUrls: ['./expanded-image.component.css']
})
export class ExpandedImageComponent implements OnInit {
  src: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.src = data.src;
    const wz = mouseWheelZoom({
      element: document.querySelector('[data-wheel-zoom]'),
      zoomStep: .4
    });
    wz.setSrc(this.src);
  }

  ngOnInit(): void {
  }

}
