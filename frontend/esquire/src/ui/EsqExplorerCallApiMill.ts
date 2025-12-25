/*
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
* 12/24/2025 mir0n kind parameter is requried for esq-cmd, esq-enode
*/
import { firstValueFrom } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { EsqNodeDetailsDialog }  from "./dialog/EsqNodeDetailsDialog";
import { EsqEntityDetailsDialog } from "./dialog/EsqEntityDetailsDialog";
import { EsqDictionaryApi }  from "../api/EsqDictionaryApi";
import { EsqExplorerCallApi } from "../api/EsqExplorerCallApi";
import { EsqRestApi }         from "../api/EsqRestApi";
import { EsqTreeNode }        from "../types/EsqTreeNode";

export class EsqExplorerCallApiMill {
  dialog:MatDialog;
  dictionaryApi:EsqDictionaryApi;
  restApi:EsqRestApi;
  
  public constructor (dialog:MatDialog, dictionaryApi:EsqDictionaryApi, restApi:EsqRestApi) {
    this.dialog = dialog;
    this.dictionaryApi = dictionaryApi;
    this.restApi = restApi;
  }
  public instance():EsqExplorerCallApi {
    return this.esqExplorerCallApi(); 
  }

  private async runDetailsAsync(cmd:string, node : EsqTreeNode, readOnly:boolean) : Promise<void> {
    var dialogRef:MatDialogRef<any>;
    if (node.type.detailed) {
      dialogRef = this.dialog.open(EsqEntityDetailsDialog, {
        autoFocus: false,
        data: {
          node: node,
          restApi: this.restApi,
          callApi : this.esqExplorerCallApi(),
          dictionaryApi: this.dictionaryApi,
          readOnly: readOnly,
        }
      });
    } else {  
      dialogRef = this.dialog.open(EsqNodeDetailsDialog, {
        autoFocus: false,
        data : {
          node : node,
          readOnly: readOnly,
        }
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    return new Promise<void>((resolve)=>resolve());
  }

  /*
  private _enode_:any = undefined;
  private async loadEntityNode (entity_id: string, entity_name: string, entity_kind: number) {
     this._enode_ = await firstValueFrom (this.restApi.esquireEntityNode(entity_id, entity_name, entity_kind));
  }
*/
  private async doExplorerCommand2(cmd: string, entity_id: string, entity_name: string, entity_kind: number) {
    var _enode_ = await firstValueFrom (this.restApi.esquireEntityNode(entity_kind, entity_id, entity_name))
                .catch((error)=>console.error(error));
    if (_enode_) {
      let enode:EsqTreeNode = new EsqTreeNode(_enode_, undefined);
      setTimeout(() => { void this.runDetailsAsync(cmd, enode as EsqTreeNode, true).catch(console.error); }, 0);
    }

  }

  private async doExplorerCommand(cmd:string, node : EsqTreeNode) {
    //readyOnly for now
    setTimeout(() => { void this.runDetailsAsync(cmd, node, false).catch(console.error); }, 0);
  }

  private esqExplorerCallApi(): EsqExplorerCallApi {
    return {
      call : (cmd: string, node :EsqTreeNode) => {
        return this.doExplorerCommand(cmd, node);
      },
      calle: (cmd: string, entity_id: string, entity_name: string, entity_kind: number) => {
        return this.doExplorerCommand2(cmd, entity_id, entity_name, entity_kind);
      },
    }
  };
}

