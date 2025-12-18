
/**
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
*/
export interface EsqColumnHeaderDef {
  columnDef:string;
  header:string;
}

export class EsqNodeType {
  public id:number;
  public name:string;
  public icon:string;
  public detailed:boolean;
  public listHeaders: EsqColumnHeaderDef[];
  constructor (id:number, name:string, icon:string, detailed:boolean, listHeaders?: EsqColumnHeaderDef[]) {
    this.id = id;
    this.name = name;
    this.icon = icon;  
    this.detailed = detailed;  
    this.listHeaders = (listHeaders?listHeaders:[]);
  }
}

export class EsqNodeTypeFactory {
  private static dictionary:EsqNodeType[] = [];
  public static UNKNOWN:EsqNodeType =  new EsqNodeType(0, "Unknown", "", false);
  public static MORE:EsqNodeType =  new EsqNodeType(999, "...", "", false);

  private constructor (dictionary: EsqNodeType[]) {
  }

  static init(dictionary: EsqNodeType[]):void {
    this.dictionary = dictionary;
  }

  public static instanceOf(tipeId: number): EsqNodeType {
    var ret:EsqNodeType = EsqNodeTypeFactory.UNKNOWN;
    if (tipeId == 999) {
      ret = EsqNodeTypeFactory.MORE;
    } else {
      if (this.dictionary.length > 0 ){
        const res:EsqNodeType[] = this.dictionary.filter((x) => x.id == tipeId) as EsqNodeType[];
        if (res && res.length > 0) {
            ret = res[0];
        } 
      }
    }
    return ret;
  } ;
  
}

