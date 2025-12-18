
/**
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
*/
export class EsqTreeNodeDto {
  public id : string = "";
  public parentId : string = "";
  public linkId : string = "";
  public name : string = "";
  public kind : number = 0;
  public entityId : string = "";
  public treeFlags : string = "";
  public statusCode : number = 0;
  public moreRemaining : boolean = false;
  public level : number = 0;
  public path : string[] = [];
  public desc : string = "";
  public all:any;
  
 constructor ( jsn?:any) {
    if (jsn ) {
        if (jsn.id) this.id = jsn.id;
        if (jsn.parentId) this.parentId = jsn.parentId;
        if (jsn.linkId) this.linkId = jsn.linkId;
        if (jsn.name) this.name = jsn.name;
        if (jsn.kind) this.kind = jsn.kind;
        if (jsn.entityId) this.entityId = jsn.entityId;
        if (jsn.treeFlags) this.treeFlags = jsn.treeFlags;
        if (jsn.statusCode) this.statusCode = jsn.statusCode;
        if (jsn.moreRemaining) this.moreRemaining = jsn.moreRemaining;
        if (jsn.level) this.level = jsn.level;
        if (jsn.path) this.path = jsn.path;
        if (jsn.desc) this.desc = jsn.desc;
        this.all = jsn;
    } 
  } 

  public value(columnRef:string ):string {
    var ret: string = "";
    try {
      const a = this.all[columnRef as keyof typeof this.all];
      if (a && (typeof a == 'string' || a instanceof String)) {
        ret = a as string;
      }
    } catch (error) {
      console.error(error);
      ret = "";
    }
    return ret;
  }

}