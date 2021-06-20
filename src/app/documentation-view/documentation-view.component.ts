import {Component, HostListener, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatDrawer} from '@angular/material/sidenav';
import {PackageNode} from '../user-view/package-node.model';
import {RouterLink} from '@angular/router';

interface DocNode {
  name: string;
  href: string;
  children?: DocNode[];
}

const TREE_DATA: DocNode[] = [
  {
    name: 'Introduction',
    href: '',
  },
  {
    name: 'Language',
    href: 'introduction',
    children: [
      {
        name: 'Language grammar',
        href: '',
      },
      {
        name: 'Command semantic',
        href: '',
        children: [
          {name: 'Common commands',
            href: ''},
          {
            name: 'Direct engineering',
            href: '',
            children: [
              {name: 'User account context',
                href: ''},
              {name: 'Project & Package context',
                href: ''},
              {name: 'Class & Interface context',
                href: ''},
              {name: 'Enum context',
                href: ''},
            ]
          },
          {name: 'Inverse engineering',
            href: ''},
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

  constructor() {
  }
  treeControl: FlatTreeControl<ExampleFlatNode>;
  public innerWidth: any;
  treeFlattener: MatTreeFlattener<DocNode, ExampleFlatNode, any>;
  dataSource: MatTreeFlatDataSource<DocNode, ExampleFlatNode, any>;
  showFiller = false;
  text = 'close';

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = TREE_DATA;
    this.innerWidth = window.innerWidth;
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
      href: node.href,
      level,
    };
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
