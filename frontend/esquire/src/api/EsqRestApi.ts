/**
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
* 12/24/2025 mir0n kind parameter is requried for esq-cmd, esq-enode
*/
import { Observable } from 'rxjs';

export interface EsqRestApi {
 esquire: (id?: string, skip?: number, take?: number, options?:any) => Observable<any>;
 esquirePath: (id: string, options?:any) => Observable<any>;
 esquireCmd: (kind: number, id: string, cmd?: string, options?:any) => Observable<any>;
 esquireEntityNode: (kind: number, id?: string, name?: string, options?:any) => Observable<any>;
 esquireDictionary: (kind: number, options?:any) => Observable<any>;

}
