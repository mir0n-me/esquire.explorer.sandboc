/**
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
*/
import {  EsqTreeNode} from '../types/EsqTreeNode';

export interface EsqExplorerCallApi {
  call: (cmd: string, node: EsqTreeNode) => Promise<void>;
  calle: (cmd: string, entity_id: string, entity_name: string, entity_kind: number) => Promise<void>;
}
