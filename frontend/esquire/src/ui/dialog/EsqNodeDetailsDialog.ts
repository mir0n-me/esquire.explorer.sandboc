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
  Inject, 
  OnDestroy,
  OnInit, 
  ViewChild, 
  ViewEncapsulation

} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common'
import {MatTableModule } from '@angular/material/table';

import { EsqTreeNode } from '../../types/EsqTreeNode';
import { EsqNodeStatusFactory } from '../../types/EsqNodeStatusFactory';

  @Component({
  selector: 'details-dialog',
  templateUrl: './EsqNodeDetailsDialog.html',
  styleUrl: './EsqDetailsDialog.scss',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    DragDropModule,
    MatIcon,
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule,
    CommonModule,
    MatTableModule
],
  encapsulation: ViewEncapsulation.None,
})



export class EsqNodeDetailsDialog implements OnInit,  AfterViewInit, OnDestroy {
   @ViewChild('btnClose') btnClose! : MatButton;
   private dialogRef: MatDialogRef<EsqNodeDetailsDialog>;
   public node : EsqTreeNode;
   public readOnly : boolean = false;

  constructor(
      dialogRef: MatDialogRef<EsqNodeDetailsDialog>, 
      @Inject(MAT_DIALOG_DATA) data: any
    ) {
      this.dialogRef = dialogRef; 
      this.node = data.node;
      this.readOnly = data.readOnly;
      this.dialogRef.disableClose = true;
      this.dialogRef.addPanelClass('esq-dialog');
      this.dialogRef.updateSize('60vw', '60vh'); 
  }      

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    if (this.btnClose)  {
       this.btnClose.focus();
    }
  }    

  nodeStatusIcon() {
    return EsqNodeStatusFactory.instanceOf(this.node.statusCode).icon;
  }
 
}