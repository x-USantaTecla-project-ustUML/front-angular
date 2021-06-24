import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {PackageNode} from '../package-node.model';

interface FlatNode {
  expandable: boolean;
  id: string;
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
  @Input() activeMemberID: string;

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<FlatNode>(
      node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.directoryTree;
    this.treeControl.expandAll();
    setTimeout(() => {
      if (document.getElementById(this.activeMemberID) !== null) {
        this.setUserIcon();
        document.getElementById(this.activeMemberID).style.color = 'dimgrey';
      }
    }, 1);
  }

  private transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      level,
    };
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnChanges(): void {
    if (this.dataSource !== undefined && this.directoryTree !== undefined) {
      this.dataSource.data = this.directoryTree;
      this.treeControl.expandAll();
      setTimeout(() => {
        this.setUserIcon();
        this.setProjectIconsAndPaint();
        this.paintSelectedNode();
      }, 1);
    }
  }

  setUserIcon(): void {
    document.getElementById('em' + this.directoryTree[0].id).className = 'material-icons';
    document.getElementById('em' + this.directoryTree[0].id).innerHTML = 'account_box';
  }

  setProjectIconsAndPaint(): void {
    this.directoryTree[0].children.forEach(value => {
      if (document.getElementById(value.id) !== null) {
        document.getElementById('em' + value.id).className = 'material-icons';
        document.getElementById('em' + value.id).innerHTML = 'folder_special';
      }
    });
  }

  paintSelectedNode(): void {
    if (document.getElementById(this.activeMemberID)) {
      document.getElementById(this.activeMemberID).style.color = 'dodgerblue';
    }
  }

}
