
/*
*  Esquire frameworks (tm)
* 
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
*  History:
*/
export class EsqUtils {
 public static DEBUG:boolean = true;
 public static DELAY:boolean = false;
  private constructor () {}

  public static log(...par:any) {
    if (this.DEBUG) {
      console.log(...par);
    }
  }

  public static async logDelay(ms:number,...par:any): Promise<void> {
    if (this.DEBUG) {
      console.log(...par);
    }
    if (this.DELAY) {
      await this.delay(ms);
    }
  }
  
  public static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
