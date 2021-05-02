import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface PackageNode {
  name: string;
  children?: PackageNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * TODO MOCK DATA, Complete with HTTPService
 */
const TREE_DATA: PackageNode[] = [
  {
    name: 'Project',
    children: [
      {
        name: 'Package1',
        children: [
          {
            name: 'Test package',
            children: [
              {name: 'Large package test to see layout problems'}
            ]
          },
          {name: 'Another package'},
        ]
      }, {
        name: 'Package2',
        children: [
          {name: 'Package2.package1'},
          {name: 'Package2.package2'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-repository-view',
  templateUrl: './repository-view.component.html',
  styleUrls: ['./repository-view.component.css']
})
export class RepositoryViewComponent {

  treeControl: FlatTreeControl<FlatNode>;
  treeFlattener: MatTreeFlattener<PackageNode, FlatNode, any>;
  dataSource: MatTreeFlatDataSource<PackageNode, FlatNode, any>;

  constructor() {
    this.treeControl = new FlatTreeControl<FlatNode>(
      node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = TREE_DATA;
    this.treeControl.expandAll();
  }

  private transformer = (node: PackageNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
    };
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

}
