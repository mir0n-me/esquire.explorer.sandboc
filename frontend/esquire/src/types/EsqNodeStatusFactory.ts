/**
*  Esquire frameworks (tm)
*
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
* History :
*/
export class EsqNodeStatus {
  public id:number;
  public name:string;
  public icon:string;
  constructor (id:number, name:string, icon:string) {
    this.id = id;
    this.name = name;
    this.icon = icon;    
  }
}

export class EsqNodeStatusFactory {
  private static dictionary:EsqNodeStatus[] = [];
  public static UNKNOWN:EsqNodeStatus =  new EsqNodeStatus(0, "Unknown", "");

  private constructor (dictionary: EsqNodeStatus[]) {
  }

  static init(dictionary: EsqNodeStatus[]):void {
    this.dictionary = dictionary;
  }

  public static instanceOf(statusId: number): EsqNodeStatus {
    var ret:EsqNodeStatus = EsqNodeStatusFactory.UNKNOWN;
    if (this.dictionary.length > 0 ){
    const res:EsqNodeStatus[] = this.dictionary.filter((x) => x.id == statusId) as EsqNodeStatus[];
    if (res && res.length > 0) {
        ret = res[0];
    } 
    }
    return ret;
  } ;
  
}

