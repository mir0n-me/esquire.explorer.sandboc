/*
*  Esquire frameworks (tm)
* 
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
*  History:
* 12/24/2025 mir0n added processing of tabstring field value type
*                  readOnly made public
*                  kind parameter is requried for esq-cmd, esq-enode
*                  listvalues_kind moved inside of generic format 
*/
import {AfterViewInit, 
   Component, 
   inject, 
   Inject, 
     OnDestroy,
      OnInit, 
      ViewChild, 
      ViewEncapsulation

} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { EsqTreeNode } from '../../types/EsqTreeNode';
import { EsqNodeStatusFactory } from '../../types/EsqNodeStatusFactory';
import { MatDividerModule } from '@angular/material/divider';
import { EsqRestApi } from '../../api/EsqRestApi';
import { firstValueFrom, from, lastValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common'
import {MatTableModule } from '@angular/material/table';
import { EsqNodeType, EsqNodeTypeFactory } from '../../types/EsqNodeTypeFactory';
import { EsqTabListComponent } from "./EsqTabListComponent";
import { EsqTabLStringComponent } from "./EsqTabStringComponent";
import { EsqExplorerCallApi } from '../../api/EsqExplorerCallApi';
import { EsqDictionaryApi } from '../../api/EsqDictionaryApi';
import { EsqEntityLayer } from '../../types/EsqEntityDictionary';

  @Component({
  selector: 'details-dialog',
  templateUrl: './EsqEntityDetailsDialog.html',
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
    MatTableModule,
    EsqTabListComponent,
    EsqTabLStringComponent
],
  encapsulation: ViewEncapsulation.None,
})

export class EsqEntityDetailsDialog implements OnInit,  AfterViewInit, OnDestroy {
   @ViewChild('btnClose') btnClose! : MatButton;
   private dialogRef: MatDialogRef<EsqEntityDetailsDialog>;
   public node : EsqTreeNode;
   private restApi: EsqRestApi;
   private dictionaryApi: EsqDictionaryApi;
   public callApi: EsqExplorerCallApi;

   public readOnly: boolean = false;
   public details$: Observable<any> | undefined;
   public dictionary$: Observable<EsqEntityLayer[]> | undefined;
   readonly detailsDialog:MatDialog = inject(MatDialog);   

  constructor(
      dialogRef: MatDialogRef<EsqEntityDetailsDialog>, 
      @Inject(MAT_DIALOG_DATA) data: any
    ) {
      this.dialogRef = dialogRef; 

      this.node = data.node;
      this.restApi = data.restApi;
      this.dictionaryApi = data.dictionaryApi;
      this.callApi = data.callApi;
      this.readOnly = data.readOnly;
      
      this.dialogRef.disableClose = true;
      this.dialogRef.addPanelClass('esq-dialog');
      this.dialogRef.updateSize('60vw', '60vh'); 
    }      

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.node.type.detailed) {
      this.dictionary$ = this.dictionaryApi.dictionary(this.node.type.id);
      this.details$ = this.restApi.esquireCmd(this.node.type.id, this.node.entityId); //from (this.loadDetails());
    }
  }

  ngOnDestroy() {
    this.details$ = undefined;
    this.dictionary$ = undefined;
  }

  ngAfterViewInit() {
    if (this.btnClose)  {
       this.btnClose.focus();
    }
  }    

  nodeStatusIcon() {
    return EsqNodeStatusFactory.instanceOf(this.node.statusCode).icon;
  }
  
  nodeTypeName():string {
    return this.node.type.name + (this.node.linkId?" (shortcut)" : "");
  }
  private async loadDetails(): Promise<any> {
    return await firstValueFrom(this.restApi.esquireCmd(this.node.kind, this.node.entityId));
  }
  nodeTypeFromFormat(format:string) : EsqNodeType {
    var id:number = -1; //unknown
    if (format) {
      var ftype:string[] = format.split('=');
      if (ftype.length > 1 && ftype[0] == 'kind') {
        id = Number(ftype[1]);
      }
    }
    return EsqNodeTypeFactory.instanceOf(id);
  }

  tabContent (index:number):string {
    return index == 0 ? "esq-first-tab-content" :  "esq-other-tab-content";
  }
}

