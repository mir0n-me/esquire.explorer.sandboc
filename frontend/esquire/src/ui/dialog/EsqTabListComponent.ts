/*
*  Esquire frameworks (tm)
* 
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
*  History:
*/
import {AfterViewInit, 
  Component, 
  ElementRef, 
  Input, 
  OnDestroy,
  OnInit, 
  QueryList, 
  ViewChildren, 
  ViewEncapsulation
} from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common'
import {MatTableModule, MatTableDataSource, MatRow } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { EsqNodeType } from '../../types/EsqNodeTypeFactory';
import { EsqExplorerCallApi } from '../../api/EsqExplorerCallApi';


  @Component({
  selector: 'esq-tab-list',
  templateUrl: './EsqTabListComponent.html',
  styleUrl: './EsqTabListComponent.scss',
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIcon,
    CommonModule,
    MatTableModule
  ],
  encapsulation: ViewEncapsulation.None,
})

export class EsqTabListComponent implements OnInit,  AfterViewInit, OnDestroy {

  public displayedColumns: string[] = ['name']; 
  public listElementHoveredIndex:number = -1;
  public listElementFocusedIndex:number = -1;
  @ViewChildren(MatRow, { read: ElementRef }) matRows!: QueryList<ElementRef>; // Assuming MatRow is a directive applied to your rows

  @Input() public esqListElements!: string[];
  @Input() public esqListNodeType!:EsqNodeType;
  @Input() public esqListHeader:string = '';
  @Input() public esqEnableAdd:boolean = false;
  @Input() public esqEnableRemove:boolean = false;
  @Input() public esqEnableSort:boolean = false;
  @Input() public esqExplorerCallApi!:EsqExplorerCallApi;

  public tabListElements: TabListElement[] = [];
  public tabListDataSource!:DataSource<TabListElement>;

  constructor() {
    this.tabListDataSource = new MatTableDataSource([]);
  }      

  ngOnInit() {
    if (this.esqListElements && this.esqListNodeType) {
      var i = 0;
      this.esqListElements.forEach((x: any) => {
        this.tabListElements[this.tabListElements.length] = {
          id : ++i,
          sort : i,
          name : x,
          icon : this.esqListNodeType.icon
        };
      })
      if(  this.tabListElements.length > 0) {
        this.listElementFocusedIndex = 0;
        this.tabListDataSource = new MatTableDataSource(this.tabListElements);
      }    
    }
  }

  ngOnDestroy() {
    this.tabListDataSource = new MatTableDataSource([]);
    this.tabListElements = [];    
  }

  ngAfterViewInit() {
  }    


  onListClick(index:number) {
    this.doSelectListElement(index);
  }
  onListDoubleClick(index:number){
    this.doSelectListElement(index);
    this.doDetailsBtn();
  }
  onListKeydown(event: KeyboardEvent, index:number) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.onListArrowup(index);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.onListArrowdown(index);
        break;
      case 'Enter':
      case ' ': // Spacebar
        event.preventDefault();
        if (this.listElementFocusedIndex >= 0) {
          this.doSelectListElement(this.listElementFocusedIndex);
        }
        break;
    }
  }

  onListArrowdown(index : number) {
    var nextIndex: number = -1;
    if (index < this.tabListElements.length -1) {
        nextIndex = index + 1;
    }
    if (nextIndex >=0) {
      this.doSelectListElement(nextIndex);
    }
  }
  onListArrowup(index : number) {
    var nextIndex: number = -1;
    if (this.tabListElements.length > 0 && index > 0) {
        nextIndex = index - 1;
    }
    if (nextIndex >=0) {
      this.doSelectListElement(nextIndex);
    }
  }

  doSelectListElement(index: number) {
    this.listElementFocusedIndex = index;
    if (index >= 0) {
      setTimeout(() => {
        const nextRows = this.matRows.toArray();  
        const nextRowElement = nextRows[index].nativeElement;
        nextRowElement.focus();
      }, 0);
    }
  }
  
  canDetailsBtn():boolean {
    return this.tabListElements.length > 0 && this.listElementFocusedIndex >=0
      && this.esqListNodeType && this.esqListNodeType.detailed;
  }
  doDetailsBtn() {
    if (this.esqExplorerCallApi && !!this.esqListNodeType && this.canDetailsBtn()) {
        var el:TabListElement=this.tabListElements[this.listElementFocusedIndex];
        if(el) {
          this.esqExplorerCallApi.calle("details",'', el.name, this.esqListNodeType.id);
        }
    }
  }
  canAddBtn():boolean {
    return this.esqEnableAdd && this.listElementFocusedIndex >=0; 
  }
  doAddBtn() {
    if (this.canAddBtn()) {
      //do noting for now
    }
  }

  canUpBtn():boolean {
    return this.esqEnableSort && this.listElementFocusedIndex > 0 && this.tabListElements.length > 1;
  }
  doUpBtn() {
    if (this.canUpBtn()) {
      //do noting for now
    }
  }
  canDownBtn():boolean {
    return this.esqEnableSort 
      && this.listElementFocusedIndex >= 0  && this.tabListElements.length > 1
      && this.listElementFocusedIndex < this.tabListElements.length -1; 
  }
  doDownBtn() {
    if (this.canDownBtn()) {
      //do noting for now
    }
  }
  canRemoveBtn():boolean {
    return this.esqEnableRemove && this.listElementFocusedIndex >=0; 
  }
  doRemoveBtn() {
    if (this.canRemoveBtn()) {
      //do noting for now
    }
  }
}

export interface TabListElement {
  id: number; 
  sort: number; 
  name: string;
  icon: string;
}
