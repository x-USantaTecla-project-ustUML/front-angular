import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatDrawer} from '@angular/material/sidenav';

interface DocNode {
  name: string;
  children?: DocNode[];
}

const TREE_DATA: DocNode[] = [
  {
    name: 'Introduction',
  },
  {
    name: 'Language',
    children: [
      {
        name: 'Context',
        children: [
          {name: 'Project'},
          {name: 'Package'},
          {name: 'Class'},
        ],
      },
      {
        name: 'Operations',
        children: [
          {name: 'Open'},
          {name: 'Close'},
          {name: 'Delete'},
          {name: 'Add'},
          {name: 'Modify'},
        ],
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-documentation-view',
  templateUrl: './documentation-view.component.html',
  styleUrls: ['./documentation-view.component.css']
})
export class DocumentationViewComponent implements OnInit {

  showFiller = false;
  text = 'close';


  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
  }

  expand(drawer: MatDrawer): void{
    if (this.text === 'close') {
      this.text = 'menu';
    } else { this.text = 'close'; }
    drawer.toggle();
  }

  private transformer = (node: DocNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
