/*
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
* 12/24/2025 mir0n debug log added
*/
import { from, lastValueFrom, Observable, of} from 'rxjs';
import { EsqDictionaryApi} from "../api/EsqDictionaryApi";
import { EsqEntityDictionary, EsqEntityLayer } from '../types/EsqEntityDictionary';
import {EsqRestApi} from '../api/EsqRestApi';
import {EsqUtils} from '../utils/EsqUtils';


export class EsqDictionary implements EsqDictionaryApi {

    private datastore:EsqEntityDictionary[] = [];
    private restApi:EsqRestApi;

    public constructor(restApi:EsqRestApi) {
        this.restApi = restApi;
    } 

    public dictionary (entity_kind: number): Observable<EsqEntityLayer[]> {
        return from (this._dictionary (entity_kind));
    }

    public async _dictionary (entity_kind: number)  {
        var ret:EsqEntityLayer[] = this.loadFromCache(entity_kind);
        if (ret && ret.length == 0 ) {
            await this.loadDictionary(entity_kind).catch(console.error);
            ret = this.loadFromCache(entity_kind);
        }
        EsqUtils.log('_dictionary ', ret);
        return ret;
    } 

    private loadFromCache (entity_kind: number) :EsqEntityLayer[]  {
        var ret:EsqEntityLayer[] = [];
        let found:EsqEntityDictionary[] = this.datastore.filter((x)=> x.kind == entity_kind);
        if (found && found.length >0 ) {
            ret = found[0].layers;
        }
        return ret;
    }

    private async loadDictionary(entity_kind: number)  {
        EsqUtils.log('loadDictionary[ ');
        var ret:EsqEntityLayer[] = [];
        let _dict = await lastValueFrom(this.restApi.esquireDictionary(entity_kind));
        if (_dict ) {
            let dict:EsqEntityDictionary = new EsqEntityDictionary(entity_kind, _dict );
            this.datastore[this.datastore.length] = dict;
        }    
        EsqUtils.log(']loadDictionary');
    }

}
