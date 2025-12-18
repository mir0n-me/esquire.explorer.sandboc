/*
*  Esquire frameworks (tm)
* 
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
*  History:
*/
import {CollectionViewer, DataSource } from "@angular/cdk/collections";
import {EsqTreeNode} from '../../types/EsqTreeNode';
import {EsqRestApi} from '../../api/EsqRestApi';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {EsqUtils} from '../../utils/EsqUtils';

export class EsqTreeViewDatasource implements DataSource<EsqTreeNode> {
  private SIZE_REQUESTED = 10;
  private dataShown = new BehaviorSubject<EsqTreeNode[]>([]);
  private dataInternal:EsqTreeNode[] = [];
  private dataTree:EsqTreeNode[] = [];
  private api: EsqRestApi;

  
  public constructor(api:EsqRestApi) {
    this.api = api;
  } 

  public get data(): EsqTreeNode[] {
    return this.dataShown.value;
  }

  public toggleSelection(node: EsqTreeNode):void {
    if (node.selected()) {
      node.selected.set(false);
    } else {
      this.dataInternal.forEach(x => x.selected.update(y => y = false));
      node.selected.set(true);
    }
  }

  public select(node: EsqTreeNode):void{
    if (!node.selected()) {
      this.dataInternal.forEach(x => x.selected.update(y => y = false));
      node.selected.set(true);
    }
  }  
 
   public async loadInitialData() {
    EsqUtils.log('loadInitialData[');
    let rootNodes = await firstValueFrom(this.api.esquire());
    let treeNodes = rootNodes.map((x: any) => new EsqTreeNode(x)); //xxx we do not have any parent for root
    this.dataInternal =  [...treeNodes];
    this.dataTree =  [...treeNodes];
    this.dataShown.next(this.dataInternal);
    EsqUtils.log(']loadInitialData');
  }

  public connect(collectionViewer: CollectionViewer): Observable<EsqTreeNode[]> {
    return this.dataShown.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.dataShown.complete();
  }
  public async loadMoreChildren(parent: EsqTreeNode){
    let node:EsqTreeNode|undefined = this.lastChild(this.dataInternal, parent);
    if (node && node.hasMore()) {
      await this.loadMore(node);
    }
  }
  
  private async loadMore(node: EsqTreeNode){
    await node.setLoading(true);
    try {
      EsqUtils.log('loadMore[');
      let siblings! : EsqTreeNode[];
      try {
        // staing on a child node, we load more brothers/systers
        if (node.parent ) {
          let index = this.countNodesUnderInternal (node.parent,false);
          let jsn = await firstValueFrom(this.api.esquire(node.parentId, index, this.SIZE_REQUESTED));
          if (jsn && Array.isArray(jsn) && jsn.length > 0) {
            siblings = jsn.map((x: any) => new EsqTreeNode(x, node.parent));
          }
          if (siblings && siblings.length > 0) {
            let grandchildren =  this.countNodesUnderInternal (node,true);
//EsqUtils.log("loaded:", siblings.length, "after:", this.data.indexOf(node), "+", grandchildren);
            this.dataInternal.splice(this.dataInternal.indexOf(node) + 1 + grandchildren, 0, ...siblings);
            let cnt = this.countNodesUnderInternal(node.parent,true);
//EsqUtils.log("updated internal:", siblings.length, "->" + cnt);
            let cntTree = this.countNodesUnderTree(node.parent,true);
            if (cntTree == cnt) {
              EsqUtils.log(1, "Achtung!!! more sublings, somehow, already on the tree...");
            } else {
              let grandchildren =  this.countNodesUnderTree (node, true);
              siblings = siblings.filter((x)=>x.treeFlags.includes("B"));
              if (siblings.length > 0) {
                this.dataTree.splice(this.dataTree.indexOf(node) + 1 + grandchildren, 0, ...siblings);
              }
            }
//EsqUtils.log("updated shown:", siblings.length, "->" + this.countNodesUnderShown(node.parent,false));
            this.dataShown.next(this.dataTree);
          } else {
//EsqUtils.log("not loaded:", siblings);
          }
        }
      } catch (error ) {
        console.error(error);
      } 
      this.cleanCollapsed();
      node.hasMore.update(x => false);
    }finally{
      EsqUtils.log(']loadMore');
      node.setLoading(false);
    }
  }

  private countNodesUnder(data:EsqTreeNode[], node: EsqTreeNode, all:boolean):number {
      let count = 0;
      let indexData = data.indexOf(node);
      for ( let i = indexData + 1; i < data.length; i++){
        if( data[i].level > node.level) {
          if (all) {
            count++;
          } else if (data[i].level == node.level + 1) {
            count++;
          }
        } else {
          //end of node 
          break;
        }
      }
      return count;
  }

  private lastChild(data:EsqTreeNode[], node: EsqTreeNode):EsqTreeNode |undefined {
      let lastNode : EsqTreeNode|undefined = undefined;
      let indexData = data.indexOf(node);
      for ( let i = indexData + 1; i < data.length; i++){
        if( data[i].level > node.level) {
          if (data[i].level == node.level + 1) {
            lastNode = data[i];
          }
        } else {
          //end of node 
          break;
        }
      }
      return lastNode;
  }

  public countNodesUnderInternal(node: EsqTreeNode, all:boolean):number {
    return this.countNodesUnder(this.dataInternal, node, all);
  }
  private countNodesUnderTree(node: EsqTreeNode, all:boolean):number {
    return this.countNodesUnder(this.dataTree, node, all);
  }
  private countNodesUnderPublic(node: EsqTreeNode, all:boolean):number {
    return this.countNodesUnder(this.data, node, all);
  }

  private removeNodesUnderTree(node: EsqTreeNode){
    let count = this.countNodesUnderTree(node,true);
    let indexTree = this.dataTree.indexOf(node);
    if (count > 0) {
//EsqUtils.log('remove children',count);
      let removed = this.dataTree.splice(indexTree + 1, count);
      removed.forEach((x)=>{x.expanded.set(false); x.selected.set(false);});
//      this.dataChange.next(this.data);
    }
  }

  public async toggleNode(node: EsqTreeNode) {
    const expand:boolean = !node.expanded();
    let hasMore = true;
    if (!node.expandable()) {
      return;
    }
    let indexTree = this.dataTree.indexOf(node);
    let indexData = this.dataInternal.indexOf(node);
    if ( indexTree < 0 || indexData <0)  {
      return;
    }
    await node.setLoading(true);
    try {
      EsqUtils.log('toggleNode[');
      node.expanded.update((x)=>!x);
      const childrenData:EsqTreeNode[] = this.dataInternal.filter(x => x.parentId == node.id);
      const childrenTree:EsqTreeNode[] = this.dataTree.filter(x => x.parentId == node.id);
      EsqUtils.log('childrenShown.childrenTree:',childrenData.length,'childrenData.length:',childrenData.length);
      if (expand) {
        if (childrenTree.length == 0) {
          if (childrenData.length == 0) {
            let jsn = await firstValueFrom(this.api.esquire(node.id, 0, this.SIZE_REQUESTED));
            let children: EsqTreeNode[] = jsn.map((x: any) => new EsqTreeNode(x,node));
            if (children && children.length > 0 ) {
              this.dataInternal.splice(indexData + 1, 0, ...children);
              children = children.filter((x)=>x.treeFlags.includes("B"));
              if (this.countNodesUnderTree(node,false) > 0) {
                EsqUtils.log(indexTree,'Achtung!!! somehow children added there:',this.countNodesUnderTree(node,false));
                this.dataShown.next(this.dataTree);
              } else {
                //removeNodesUnder
                if (children.length > 0) {
                  this.dataTree.splice(indexTree + 1, 0, ...children);
                }
                this.dataShown.next(this.dataTree);
              }
            }
          } else {
            let children = childrenData.filter((x)=>x.treeFlags.includes("B"));
            if (children.length > 0) {
              this.dataTree.splice(indexTree + 1, 0, ...children);
            }
            this.dataShown.next(this.dataTree);
          }
        } else {
          this.dataShown.next(this.dataTree);
        }
      } else {
        if (childrenTree.length > 0) {
          // Otherwise, if the node is being collapsed, 
          // work out how many nodes are children
            this.removeNodesUnderTree(node);
            this.dataShown.next(this.dataTree);
        }
      }
      //something wierd going on: uncontrollable adding nodes to non-expanend nodes
      this.cleanCollapsed();
    } finally {
      EsqUtils.log(']toggleNode');
      node.setLoading(false);
    }
  }

  private cleanCollapsed() {
    var doItAgan = true;
    while (doItAgan) {
      doItAgan = false;
      for (let i = 0; i < this.dataTree.length; i++) {
          let nd:EsqTreeNode = this.dataTree[i];
          if (!nd.expanded()) {
            let cnt = this.countNodesUnderTree(nd,false);
            if(cnt>0){
              EsqUtils.log(i, 'Achtung!!! node is collapsed but shows kids',cnt);
              this.removeNodesUnderTree(nd);
              this.dataShown.next(this.dataTree);
                cnt = this.countNodesUnderTree(nd,false);
              EsqUtils.log(i, 'after removal: ',cnt);
              doItAgan = true;
            }
          }
      }    
    }
  }

  public isVisible(node: EsqTreeNode):boolean {
    const i = this.dataInternal.indexOf(node);
    const i2 = this.data.indexOf(node);
    const i3:number = this.dataShown.value.indexOf(node);
    const index = this.dataTree.indexOf(node);
    return index >= 0;
  }

  ///xxx only for leaf database : out of lock;
  public async loadChildren(node: EsqTreeNode) {
    EsqUtils.log('loadChildren[');
    //extend on internal only
    const index = this.dataInternal.indexOf(node);
    if (index >=0 && node.expandable()) {
      let cnt = this.countNodesUnderInternal(node,false);
      if (cnt == 0) {
        let jsn = await firstValueFrom(this.api.esquire(node.id, 0, this.SIZE_REQUESTED));
        let children: EsqTreeNode[] = jsn.map((x: any)  => new EsqTreeNode(x,node));
        if (children && children.length > 0) {
          this.dataInternal.splice(index + 1, 0, ...children);
        }
      }
    }
    EsqUtils.log(']loadChildren');
  }

  private async loadMoreInternal(node: EsqTreeNode){
    EsqUtils.log('loadMoreInternal[');
//    await node.setLoading(true);
    try {
      let siblings! : EsqTreeNode[];
      try {
        // staing on a child node, we load more brothers/systers
        if (node.parent ) {
          let index = this.countNodesUnderInternal (node.parent,false);
          let jsn = await firstValueFrom(this.api.esquire(node.parentId, index, this.SIZE_REQUESTED));
          if (jsn && Array.isArray(jsn) && jsn.length > 0) {
            siblings = jsn.map((x: any) => new EsqTreeNode(x, node.parent));
          }
          if (siblings && siblings.length > 0) {
            let grandchildren =  this.countNodesUnderInternal (node,true);
            this.dataInternal.splice(this.dataInternal.indexOf(node) + 1 + grandchildren, 0, ...siblings);
            let cnt = this.countNodesUnderInternal(node.parent,true);
          }
        }
      } catch (error ) {
        console.error(error);
      } 
      node.hasMore.update(x => false);
    }finally{
      EsqUtils.log(']loadMoreInternal');
//      node.setLoading(false);
    }
  }

  public getById(id:string) : EsqTreeNode|undefined{
    let ret:EsqTreeNode|undefined = undefined;
    const found:EsqTreeNode[] = this.dataInternal.filter(x => x.id == id);
    if (found && found.length >0) {
      ret = found[0];
    }
    return ret;
  }

  public async findInSublings(id:string, parent:EsqTreeNode){
    EsqUtils.log('findInSublings[')    
    var ret:EsqTreeNode|undefined =undefined;
    var cnt = this.countNodesUnderInternal(parent, false);
    if (cnt == 0) {
      await this.loadChildren(parent);
    }
    ret  = this.getById(id);
    if (!ret) {
      var lastKid:EsqTreeNode|undefined =  this.lastChild(this.dataInternal, parent);
      if (lastKid) {
        while(!ret && (lastKid as EsqTreeNode).hasMore()) {
            await this.loadMoreInternal(lastKid as EsqTreeNode);
            ret  = this.getById(id);
            lastKid = this.lastChild(this.dataInternal, parent)            
        }
      }
    }
    EsqUtils.log(']findInSublings',ret)    
    return ret;
  }
  
  public clear() {
    this.dataInternal = [];
    this.dataTree = [];
    this.dataShown.next(this.dataInternal);    
  }  

  public async getPath(id :string) {
    var jsn = await firstValueFrom(this.api.esquirePath(id));
    var ret :string[] = [];
    if (jsn && Array.isArray(jsn) && jsn.length > 0) {
      ret = jsn;
    }   
    return ret;
  }

   public hasMoreChildren(parent:EsqTreeNode): boolean {
      var lastKid:EsqTreeNode|undefined =  this.lastChild(this.dataInternal, parent);
      return (lastKid ? lastKid.hasMore() : false);
  }

   public getChildren(parent_id:string): EsqTreeNode[] {
      return this.dataInternal.filter(x => x.parentId == parent_id);
   }

  
}
