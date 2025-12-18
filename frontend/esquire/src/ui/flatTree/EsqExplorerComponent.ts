/*
*  Esquire frameworks (tm)
* 
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
*  History:
*/
import {Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  signal,
  ViewChild,
  AfterViewInit,
  afterEveryRender,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { EsqColumnHeaderDef, EsqNodeType, EsqNodeTypeFactory } from '../../types/EsqNodeTypeFactory';
import { MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding } from '@angular/material/tree';
import { MatRow, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { EsqRestApi } from '../../api/EsqRestApi';
import {  EsqNodeStatusFactory } from '../../types/EsqNodeStatusFactory';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AsEsqTreeNodePipe } from '../../types/AsEsqTreeNodePipe';
import { EsqResizeDirective } from '../EsqResizeDirective';
import { EsqFlatTreeDatasource } from '../flatTree/EsqFlatTreeDatasource';
import { EsqTreeNode } from '../../types/EsqTreeNode';
import { EsqUtils } from '../../utils/EsqUtils';
import { EsqExplorerCallApi } from '../../api/EsqExplorerCallApi';

@Component({
  selector: 'esqExplorer',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    CommonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTableModule,
    AsEsqTreeNodePipe,
    MatTree,
    MatTreeNode,
    MatTreeNodeDef,
    MatTreeNodePadding,
    EsqResizeDirective,
],
  templateUrl: './EsqExplorerComponent.html',
  styleUrl: './EsqExplorerComponent.scss',
  encapsulation: ViewEncapsulation.None ,
  host: { 'class': 'esq-explorer'}
})

export class EsqExplorerComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public esqRestApi: EsqRestApi | null = null;
  @Input() public esqExplorerCallApi: EsqExplorerCallApi | null = null;

   
  treeLevelAccessor = (dataNode: EsqTreeNode)  => dataNode.level;
  datasource!: EsqFlatTreeDatasource;

  listColumns:EsqColumnHeaderDef[] = [];
  listColumnsDisplayed:string[] = [];

  listNodeFocused: EsqTreeNode | undefined = undefined;
  listNodeOwner:EsqTreeNode | null = null;
  listNodeExecuted:EsqTreeNode | null = null;
  listNodeHoveredIndex = -1;
  listNodeOwnerPath = signal("");

  listNodeHistoryStack:EsqTreeNode[] = []; 
  listNodeHistoryIndex:number = -1; 

  treeNodePostFocus:EsqTreeNode | null = null; 
  treeNodeActive: EsqTreeNode | null = null;
  treeNodeEntered: EsqTreeNode | null = null;
  treeNodeLastFocus: EsqTreeNode | null = null;

  @ViewChild('EsqExplTree') _tree!: MatTree<EsqTreeNode>;
  @ViewChild('EsqSidenav') sidenav!: MatSidenav;

  treeItself!:MatTree<EsqTreeNode>;
  @ViewChildren(MatRow, { read: ElementRef }) matRows!: QueryList<ElementRef>; // Assuming MatRow is a directive applied to your rows
  
  initialDataLoading = signal(true);
  dataLoading = signal(false);
  treeOnFocus:boolean = false;

  constructor () {
    afterEveryRender(() => { 
      if (this.treeNodePostFocus) {
        this.setFocusTreeNode(this.treeNodePostFocus);
        this.treeNodePostFocus = null;
      }     
    });    
  }

  async ngAfterViewInit() {
    this.treeItself = this._tree;
  }

  async ngOnInit() {
    if (!this.esqRestApi) {
      console.error("No esqRestApi defined");
    }
    this.datasource = new EsqFlatTreeDatasource(this.esqRestApi as EsqRestApi);
    await this.datasource.loadInitialData();
    this.listNodeOwner = this.datasource.data4tree[0];
    if (this.listNodeOwner) {
      this.updatePath();
      this.treeNodeActive = this.listNodeOwner; 
      await this.datasource.loadChildren(this.listNodeOwner as EsqTreeNode);
      if (this.datasource.data4list.length>0) {
        this.listNodeFocused = this.datasource.data4list[0];
        this.listNodeHistoryStack[0] = this.listNodeOwner; 
        this.listNodeHistoryIndex = 0;         
      }
      this.listColumns = (this.listNodeOwner as EsqTreeNode).type.listHeaders;
      this.listColumnsDisplayed = this.listColumns.map((x)=>x.columnDef);
      this.treeNodePostFocus = this.treeNodeActive;
      this.initialDataLoading.set(false);
    }
  }

  public toggleSideNav(): void {
    if (this.sidenav) {
      this.sidenav!.toggle();
    }
  }

  ngOnDestroy(): void {
    // dummy for now
  }

  hasIcon(node : EsqTreeNode ) : boolean {
    return (node.type.icon.length>0);
  }

  nodeIcon(node : EsqTreeNode ) {
    return node.type.icon;
  }
  
  nodeStatusIcon(node : EsqTreeNode) {
    return EsqNodeStatusFactory.instanceOf(node.statusCode).icon;
  }

  updatePath() {
    var path:string = "";
    if (this.listNodeOwner) {
      let node:EsqTreeNode|undefined = this.listNodeOwner;
      var first:boolean = true;
      do {
        path = node.name + (first? "" : "/") + path;
        node = node?.parent;
        first = false;
      } while (node);

    }
    this.listNodeOwnerPath.update(()=>path);
  }

 // -- menu button -- 
  canBtnBackClick() : boolean {
    return this.listNodeHistoryIndex > 0 
    && this.listNodeHistoryStack.length > this.listNodeHistoryIndex;
  }
  async onBtnBackClick() {
    if (this.canBtnBackClick()) {
      this.listNodeHistoryIndex--;
      let node:EsqTreeNode = this.listNodeHistoryStack[this.listNodeHistoryIndex];
      this.doTreeExpandSelect(node);
    } 
  }
  canBtnForwardClick() : boolean {
    return this.listNodeHistoryStack.length > 0
      && this.listNodeHistoryIndex >= 0 
      && this.listNodeHistoryIndex+1 < this.listNodeHistoryStack.length;
  }
  async onBtnForwardClick() {
    if (this.canBtnForwardClick()) {
      this.listNodeHistoryIndex++;
      let node:EsqTreeNode = this.listNodeHistoryStack[this.listNodeHistoryIndex];
      this.doTreeExpandSelect(node);
    } 
  }

  canBtnUpClick() : boolean {
    var ret:boolean = false;
    if (this.listNodeOwner && this.listNodeOwner.parent) {
      ret = true;
    }
    return ret;
  }
  async onBtnUpClick() {
    if (this.canBtnUpClick()) {
      if (this.listNodeOwner && this.listNodeOwner.parent) {
        if (this.listNodeHistoryIndex > 0 
        && this.listNodeHistoryIndex+1 < this.listNodeHistoryStack.length) {
           this.listNodeHistoryStack = this.listNodeHistoryStack.slice(0, this.listNodeHistoryIndex+1);
        }
        this.doTreeExpandSelect(this.listNodeOwner.parent);
      }
    } 
  }

  async onBtnRefreshClick() {
    EsqUtils.log('onBtnRefreshClick[');   
    this.initialDataLoading.set(true);
    var node:EsqTreeNode|null = null;
    if (this.listNodeFocused) {
      node = this.listNodeFocused;
      this.listNodeFocused = undefined; 
    }
    this.datasource.clear();
    this.listNodeHistoryIndex = -1;
    this.listNodeHistoryStack = [];
    await this.datasource.loadInitialData();
    if (node) {
      let n:any = await this.datasource.gotoListNode(node.id);
      if (n && n instanceof EsqTreeNode) {
        node = n as EsqTreeNode;
        this.toggleTreeSelect(node.parent as EsqTreeNode);
        this.doSelectListNode(node, true);
      }
    }
    this.initialDataLoading.set(false);
    EsqUtils.log(']onBtnRefreshClick');   
  }
  
  canBtnGotoClick() : boolean {
    var ret :boolean = false;
    if (this.listNodeFocused) {
      ret = this.listNodeFocused.linkId != "";
    }
    return ret;
  }
  async onBtnGotoClick() {
   if (this.canBtnGotoClick()) {
      const id : string = (this.listNodeFocused as EsqTreeNode).linkId;
      EsqUtils.log('onBtnGotoClick[', id);      
      this.dataLoading.set(true);
      let n:any = await this.datasource.gotoListNode(id);
      if (n && n instanceof EsqTreeNode) {
        let node:EsqTreeNode = n as EsqTreeNode;
        EsqUtils.log('found :',  node);
        this.toggleTreeSelect(node.parent as EsqTreeNode);
         this.doSelectListNode(node, true);
      }
      this.dataLoading.set(false);
      EsqUtils.log('onBtnGotoClick]');      
   }
  }
  
  async doExplorerCommand(cmd:string, node : EsqTreeNode | undefined) {
    if (node && this.esqExplorerCallApi) {
      const api:EsqExplorerCallApi = this.esqExplorerCallApi as EsqExplorerCallApi;
      return api.call(cmd,node as EsqTreeNode);
    } else {
      return new Promise<void>((resolve)=>resolve());
    }
  }
  async onBtnDetailsClick() {
      EsqUtils.log("onBtnDetailsClick[");
      await this.doExplorerCommand("default", this.listNodeFocused);
      EsqUtils.log("]onBtnDetailsClick");
  }

  canBtnMoreClick() : boolean {
    var ret:boolean = false;
    if (this.listNodeOwner) {
      ret = this.datasource.hasMoreChildren(this.listNodeOwner);
    }
    return ret;
  }
  async onBtnMoreClick() {
    if (this.canBtnMoreClick()) {
      this.dataLoading.set(true);
      await this.datasource.loadMoreChildren(this.listNodeOwner as EsqTreeNode);
      this.dataLoading.set(false);
    }
  }


// ------------list view  events -----  
  onListFocus(node: EsqTreeNode){
    this.treeOnFocus = false;
    this.treeNodeEntered=null; 
    if (this.treeNodeLastFocus) {
      this.treeNodeLastFocus = null;
    }
  }

  onListFocusOut(node: EsqTreeNode){
  }

  onListClick(node: any) {
    this.doSelectListNode(node, true);
   }

   onListDoubleClick(node: any) {
      this.doSelectListNode(node, true);
      this.doDefaultListNode();
   }

  onListKeydown(event: KeyboardEvent, node: EsqTreeNode, index: number) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.onListArrowup(node, index);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.onListArrowdown(node, index);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.listNodeFocused) {
          if (event.altKey) {
            this.doExplorerCommand("default", this.listNodeFocused);
          } else {
            this.doSelectListNode(this.listNodeFocused, true);
            this.doDefaultListNode();
          }
        }
        break;
      case ' ': // Spacebar
        event.preventDefault();
        if (this.listNodeFocused) {
          this.doSelectListNode(this.listNodeFocused, true);
        }
        break;
    }
  }

  onListArrowdown(node: EsqTreeNode, index : number) {
    var nextRow! : EsqTreeNode ;
    if (index < this.datasource.data4list.length - 1) {
        nextRow = this.datasource.data4list[index + 1];
    }
    if (nextRow) {
      this.doSelectListNode(nextRow, true);
    }
  }
  onListArrowup(node: EsqTreeNode, index : number) {
    var nextRow! : EsqTreeNode ;
    if (index > 0) {
        nextRow = this.datasource.data4list[index - 1];
    }
    if (nextRow) {
      this.doSelectListNode(nextRow, true);
    }
  }

  //----- tree view events ---------
  onTreeClick(node: any) {
    this.toggleTreeActivate(node, false);
  }

   onTreeDoubleClick(node: any) {
      this.toggleTreeExpandSelect(node);
   }

  onTreeNodeEnter (node: EsqTreeNode){
    this.treeNodeEntered = node;
  }

  onTreeNodeLeave () {
    this.treeNodeEntered = null;
  }  
  
  async onTreeNodeExpansion($event: boolean, node: EsqTreeNode) {
    EsqUtils.log("handleNodeExpansion[");
    this.dataLoading.set(true);
    await this.datasource.toggleOnTree(node);
    this.doActivateListExecuted();
    this.dataLoading.set(false);
    EsqUtils.log("]handleNodeExpansion");
  }

   onTreeFocus(node: EsqTreeNode){
    this.treeOnFocus = true;
  }

  onTreeFocusOut(node: EsqTreeNode){
    this.treeNodeLastFocus = node;
  }

  onTreeKeydown(event: KeyboardEvent, node: EsqTreeNode) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.onTreeNodeEnter(node);
        break;
      case 'ArrowDown':
        event.preventDefault();
       this.onTreeNodeEnter(node);
         break;
      case 'ArrowLeft':
        event.preventDefault();
       this.onTreeLeft(node);
         break;
      case 'ArrowRight':
        event.preventDefault();
       this.onTreeRight(node);
         break;
      case 'Enter':
        event.preventDefault();
        if (event.altKey) {
          this.doExplorerCommand("default", node);
        } else {
          this.toggleTreeActivate(node, false);
          this.treeItself.toggle(node);
        }
        break;
      case ' ': // Spacebar
        event.preventDefault();
        this.toggleTreeActivate(node, false);
        break;
      case 'Back':
        event.preventDefault();
        this.onBtnBackClick();
        break;
    }
  }

  onTreeLeft(node: EsqTreeNode) {
    //xxx: sometimes tree getting late
    if (this.treeItself.isExpanded(node) || node.expanded()) {
      this.treeItself.toggle(node);
      this.toggleTreeSelect(node);
    }
    this.onTreeNodeEnter(node);
  }
  onTreeRight(node: EsqTreeNode) {
    //xxx: sometimes tree getting late
    if (node.expandable() && !(this.treeItself.isExpanded(node) && node.expanded())) {
      this.treeItself.toggle(node);
      this.toggleTreeSelect(node);
    }
    this.onTreeNodeEnter(node);
  }  
  
// -- actions --- 

  doSelectListNode(node: EsqTreeNode, focused:boolean) {
    if (node) {
      EsqUtils.log("select[",focused);
      this.dataLoading.set(true);
      const index = this.datasource.data4list.indexOf(node!);
      this.listNodeFocused = node;
      if  (focused) {
        setTimeout(() => {
          const nextRows = this.matRows.toArray();  
          const nextRowElement = nextRows[index].nativeElement;
          nextRowElement.focus();
        }, 0);
      }
      this.dataLoading.set(false);
      EsqUtils.log("]select");
    }
  }

  async doDefaultListNode() {
    EsqUtils.log('runDefault[', this.listNodeFocused);
    this.dataLoading.set(true);
    let doDefault:boolean = false;
    let doActivate:boolean = false;
    if (this.listNodeFocused) {
      const node:EsqTreeNode = this.listNodeFocused as EsqTreeNode;  
      doActivate = true;
      if (!this.datasource.isVisibleOnTree(node)) {
        if (node.expandable()) {
          EsqUtils.log('toggle');
          this.treeItself.toggle(node.parent as EsqTreeNode);
          this.listNodeExecuted = node;
        } else {
          doActivate = false;;
          doDefault = true;
        }
      } 
    }
    if (doActivate) {
      this.toggleTreeActivate(this.listNodeFocused, true);
    }
    this.dataLoading.set(false);
    if (doDefault) {
      await this.doExplorerCommand("default", this.listNodeFocused);
    }
    EsqUtils.log(']runDefault');
  }

  doActivateListExecuted(){
      const node:EsqTreeNode|null = this.listNodeExecuted;
      if (node) {
        this.listNodeExecuted = null;
        EsqUtils.log('doActivateListExecuted[', node);
        var i =0;
        for (;i<1000;i++) {
          setTimeout(() => {
            let g = 1;
          }, 10);
          if (this.datasource.isVisibleOnTree(node)) {
            break;
          }
        }
        if (this.datasource.isVisibleOnTree(node)){
          EsqUtils.log('Asyn activate list IS executed  at ', i * 10, 'ms');
          this.toggleTreeActivate(node, true);
        } else {
          EsqUtils.log('Asyn activivate list IS NOT executed');
        }
        EsqUtils.log(']doActivateNode');
      }
    }

  async doActivateListNode (node: EsqTreeNode, listFocused:boolean) {
    EsqUtils.log("doActivateListNode[" + listFocused);
    this.dataLoading.set(true);
      await this.datasource.loadChildren(node);
      if ((this.listNodeOwner as EsqTreeNode).type  != node.type) {
        this.listColumns = node.type.listHeaders;
        this.listColumnsDisplayed = this.listColumns.map((x)=>x.columnDef);
        this.listColumnsDisplayed = [...this.listColumnsDisplayed]; 
      }
      this.treeNodePostFocus = null;
      if (this.datasource.data4list.length>0) {
        this.doSelectListNode(this.datasource.data4list[0], listFocused);
      }
      if (this.listNodeOwner != node) {
        this.listNodeOwner = node;
        this.updatePath();
        if (this.listNodeHistoryIndex+1 == this.listNodeHistoryStack.length) { 
          if (this.listNodeHistoryStack[this.listNodeHistoryIndex] != node) {
            this.listNodeHistoryStack[this.listNodeHistoryStack.length] = node;
            if (this.listNodeHistoryStack.length > 5) {
              this.listNodeHistoryStack.shift();
            }
            this.listNodeHistoryIndex = this.listNodeHistoryStack.length -1;
          }
        }
      }
    this.dataLoading.set(false);
    EsqUtils.log("]doActivateListNode");
  }

  setFocusTreeNode(node: EsqTreeNode) {
    // Find the corresponding DOM element
    const element = document.getElementById('node-' + node.id);
    if (element) {
      // Use setTimeout to ensure the element is rendered and available in the DOM
      setTimeout(() => {
        element.focus();
      }, 0);
    }
  }

  toggleTreeSelect(node: EsqTreeNode){
    if (this.treeNodeActive != node) {  
      this.treeNodeActive = node;
      this.datasource.toggleTreeSelection(node);
    }
  }

  toggleTreeActivate(node: EsqTreeNode | undefined, listFocused:boolean){
    if (node && this.treeNodeActive != node) {  
      this.treeNodeActive = node;
      this.datasource.toggleTreeSelection(node);
      if(node.expandable()) { 
        this.doActivateListNode (node, listFocused);
      }
    }
  }
  toggleTreeExpandSelect(node: EsqTreeNode) {
    this.treeItself.toggle(node);
    if (node.expandable()) {
        this.doActivateListNode (node, false);
    }
  }
  
  doTreeExpandSelect(node: EsqTreeNode) {
    if (node && node.expandable()) {
      this.treeItself.expand(node);
      this.datasource.selectOnTree(node);
      this.treeNodeActive = node;
      //this.toggleTreeSelect(node);      
      //this.treeNodeActive = node;
      this.doActivateListNode (node, false);
    }
  }

}
