import {FlatTreeControl} from '@angular/cdk/tree';
import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {PackageNode} from '../package-node.model';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-repository-view',
  templateUrl: './repository-view.component.html',
  styleUrls: ['./repository-view.component.css']
})
export class RepositoryViewComponent implements OnInit, OnChanges {

  treeControl: FlatTreeControl<FlatNode>;
  treeFlattener: MatTreeFlattener<PackageNode, FlatNode, any>;
  dataSource: MatTreeFlatDataSource<PackageNode, FlatNode, any>;
  @Input() directoryTree: PackageNode[];
  @Input() selectedNodeId: string;

  constructor() {
  }

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<FlatNode>(
      node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.directoryTree;
    this.treeControl.expandAll();
    setTimeout(() => {
      if (document.getElementById(this.selectedNodeId) !== null) {
        document.getElementById(this.selectedNodeId).style.color = 'dimgrey';
      }
    }, 1);
  }

  private transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
    };
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnChanges(): void {
    if (this.dataSource !== undefined && this.directoryTree !== undefined) {
      this.dataSource.data = this.directoryTree;
      this.treeControl.expandAll();
      this.paintProjects();
      this.paintSelectedNode();
    }
  }

  paintProjects(): void{
    setTimeout(() => {
      this.directoryTree[0].children.forEach(value =>  {
        const nodesToPaint = document.getElementsByClassName(value.name) as HTMLCollectionOf<HTMLElement>;
        if (document.getElementById(value.name) !== null) {
          if (nodesToPaint.length === 2) {
            nodesToPaint[1].style.color = 'cornflowerblue';
          }else{
            nodesToPaint[0].style.color = 'cornflowerblue';
          }
        }
        });
      }, 1);
  }

  paintSelectedNode(): void{
    setTimeout(() => {
      const nodesToPaint = document.getElementsByClassName(this.selectedNodeId) as HTMLCollectionOf<HTMLElement>;
      if (document.getElementById(this.selectedNodeId)) {
        if (nodesToPaint.length === 2){
          const context = document.getElementById('ustUML').innerHTML.split('members:')[0];
          if (context[0] === undefined){
            nodesToPaint[0].style.color = 'mediumblue';
          }else{
            nodesToPaint[1].style.color = 'mediumblue';
          }
        }else{
          document.getElementById(this.selectedNodeId).style.color = 'mediumblue';
        }
      }
      }, 1);
  }

}
