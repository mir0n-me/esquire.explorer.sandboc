/*
*  Esquire frameworks (tm)
* 
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
*  History:
*/
import {CollectionViewer, DataSource } from "@angular/cdk/collections";
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {EsqTreeViewDatasource} from './EsqTreeViewDatasource';
import {EsqTreeNode} from '../../types/EsqTreeNode';
import {EsqColumnHeaderDef} from '../../types/EsqNodeTypeFactory';
import {EsqUtils} from '../../utils/EsqUtils';

export class EsqListViewDatasource implements DataSource<EsqTreeNode> {
  private static DEFAULT_HEADER:EsqColumnHeaderDef[] =  [{columnDef:"name", header:"Name"}]; 
  private header:EsqColumnHeaderDef[];

  private treeDatasource: EsqTreeViewDatasource;
  private dataChange = new BehaviorSubject<EsqTreeNode[]>([]);

  public constructor (treeDatasource: EsqTreeViewDatasource) {
    this.treeDatasource =treeDatasource; 
    this.header = EsqListViewDatasource.DEFAULT_HEADER;
  } 
  
  public connect(collectionViewer: CollectionViewer): Observable<EsqTreeNode[]> {
     //return this.dataChange;
    return this.dataChange.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
      this.dataChange.complete();
  }

  public get data(): EsqTreeNode[] {
    return this.dataChange.value;
  }

  public async loadChildren(node: EsqTreeNode) {
    await node.setLoading(true);
    try {
      EsqUtils.log('list.loadChildren[');
      if (node.type.listHeaders.length > 0 ) {
        this.header = node.type.listHeaders;
      } else {
          this.header = EsqListViewDatasource.DEFAULT_HEADER;
      }
      let cnt = this.treeDatasource.countNodesUnderInternal(node,false);
      if (cnt == 0) {
        await this.treeDatasource.loadChildren(node);
        cnt = this.treeDatasource.countNodesUnderInternal(node,false);
        EsqUtils.log('loadChildren:loaded:',cnt);
      }
      this.dataChange.next([]);
      let children: EsqTreeNode[] = this.treeDatasource.getChildren(node.id);
      this.dataChange.next(children)
      EsqUtils.log('loadChildren:posted:',children);
    } finally{
      EsqUtils.log(']list.loadChildren');
      node.setLoading(false);
    }
  }

  public clear() {
      this.dataChange.next([]);
  }


}
