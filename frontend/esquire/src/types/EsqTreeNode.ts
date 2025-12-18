
/**
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
*/
import {NgModule, signal} from '@angular/core';
import {EsqTreeNodeDto} from './EsqTreeNodeDto';
export {EsqTreeNodeDto} from './EsqTreeNodeDto';
import {EsqNodeType, EsqNodeTypeFactory} from './EsqNodeTypeFactory';


export class EsqTreeNode extends EsqTreeNodeDto {
  public loading = signal(false);
  public expandable = signal(false);
  public selected = signal(false);
  public hasMore = signal(false);
  public hasChild = signal(false);
  public expanded = signal(false);

  
  public type: EsqNodeType;
  public parent?: EsqTreeNode;
  //public data?: | string | Array<string>;
  private loadingMutex = new Mutex();

  constructor(jsn?:any, parent?:EsqTreeNode) {
    super(jsn);
    this.type = EsqNodeTypeFactory.instanceOf(this.kind);
    this.hasMore.set(this.moreRemaining);
    this.expandable.set(this.treeFlags.includes('B'));
    this.hasChild.set(this.treeFlags.includes('T'));
    if (parent) {
      this.parent = parent as EsqTreeNode;
    }
  }

  async setLoading(flag:boolean) {
    if (flag) { //enter tcritical section
      await this.loadingMutex.lock();
      this.loading.set(true);
    } else { //exit critical section
      this.loading.set(false);
      this.loadingMutex.unlock();
    }

  } 
 
  
}

class Mutex {
  locked:boolean;
  constructor() {
    this.locked = false;
  }

  async lock() {
    while (this.locked) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }
}


