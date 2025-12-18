/**
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
*/
import { Observable } from 'rxjs';

export interface EsqRestApi {
 esquire: (id?: string, skip?: number, take?: number, options?:any) => Observable<any>;
 esquirePath: (id: string, options?:any) => Observable<any>;
 esquireCmd: (id: string, cmd?: string, options?:any) => Observable<any>;
 esquireEntityNode: (id?: string, name?: string, kind?: number, options?:any) => Observable<any>;
 esquireDictionary: (kind: number, options?:any) => Observable<any>;

}
