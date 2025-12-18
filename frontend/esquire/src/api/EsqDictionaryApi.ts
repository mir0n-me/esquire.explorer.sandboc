/**
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
*/
import { Observable } from 'rxjs';
import { EsqEntityLayer } from '../types/EsqEntityDictionary';

export interface EsqDictionaryApi {
  dictionary: (entity_kind: number) => Observable<EsqEntityLayer[]>
}
