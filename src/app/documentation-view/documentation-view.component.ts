import {Component, HostListener, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface DocNode {
  name: string;
  href: string;
  children?: DocNode[];
}

const TREE_DATA: DocNode[] = [
  {
    name: 'Introduction',
    href: 'introduction',
    children: []
  },
  {
    name: 'Language',
    href: 'language',
    children: [
      {
        name: 'Language grammar',
        href: 'language-grammar',
      },
      {
        name: 'Command semantic',
        href: 'command-semantic',
        children: [
          {name: 'Common commands',
            href: 'common-commands'},
          {
            name: 'Direct engineering',
            href: 'direct-engineering',
            children: [
              {name: 'User account context',
                href: 'user-context'},
              {name: 'Project & Package context',
                href: 'project-context'},
              {name: 'Class & Interface context',
                href: 'class-context'},
              {name: 'Enum context',
                href: 'enum-context'},
            ]
          },
          {name: 'Inverse engineering',
            href: 'inverse-engineering'},
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

  treeControl: FlatTreeControl<ExampleFlatNode>;
  public innerWidth: any;
  treeFlattener: MatTreeFlattener<DocNode, ExampleFlatNode, any>;
  dataSource: MatTreeFlatDataSource<DocNode, ExampleFlatNode, any>;
  mode = 'side';
  text = 'close';

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = TREE_DATA;
    this.innerWidth = window.innerWidth;
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 720) {
      this.mode = 'over';
      this.text = 'menu';
    } else {
      this.mode = 'side';
      this.text = 'close';
    }
  }

  expand(drawer): void{
    if (this.text === 'close') {
      this.text = 'menu';
    } else if (this.mode !== 'over') { this.text = 'close'; }
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
