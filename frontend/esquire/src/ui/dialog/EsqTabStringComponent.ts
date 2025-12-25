/*
*  Esquire frameworks (tm)
* 
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
*  History:
*/
import { NgClass } from '@angular/common';
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


  @Component({
  selector: 'esq-tab-string',
  templateUrl: './EsqTabStringComponent.html',
  styleUrl: './EsqTabStringComponent.scss',
  imports: [
    [NgClass]
  ],
  encapsulation: ViewEncapsulation.None,
})

export class EsqTabLStringComponent implements OnInit,  AfterViewInit, OnDestroy {

  @Input() public value!: string;
  @Input() public readOnly: boolean = true;

  constructor() {
  }      

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }    

}

