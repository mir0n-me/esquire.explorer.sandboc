/**
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
*/
import { Pipe, PipeTransform } from '@angular/core';
import { EsqTreeNode } from './EsqTreeNode';

@Pipe({
  name: 'asEsqTreeNode',
  standalone: true
})
export class AsEsqTreeNodePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): EsqTreeNode {
    return value as EsqTreeNode;
  }

}
