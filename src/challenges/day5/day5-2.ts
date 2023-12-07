
type seedType = number
type conversionType = {from:string,to:string,ranges:RangeConversion[]}



export default function(value:string){

  const [seeds,conversions]=makeJSON(value)
  console.log(seeds,conversions)
}



















export function makeJSON(value:string):[Range[],conversionType[]]{
  const [_seeds,...conversionRanges] = value.split("\n\n")

  var [_,seeds] = _seeds.split("seeds: ")
  var seedsList = seeds.split(" ").map(Number)
  
  const seedsRanges:Range[] = []
  for(let i=0;i<seedsList.length;i+=2){
    const start = seedsList[i]
    const len = seedsList[i+1]
    seedsRanges.push(new Range(start,start + len))
  }
  
  const rangesList:conversionType[] = conversionRanges.map(x=>{
    const [title,convs]=x.split(" map:\n")
    const [from,to] = title.split("-to-")
    return {
      from,
      to,
      ranges:convs.split("\n").map(y=>{
        const [dest,orig,len] = y.split(" ").map(Number)
        return new RangeConversion(dest,orig,len)
      })
    }
  })
  

  return [seedsRanges,rangesList]
}










export class RangeConversion{
  diff:number;
  rangeOrig:Range;
  rangeDest:Range;

  constructor(private dest:number,private orig:number,public len:number){
    this.rangeOrig = new Range(orig,orig+len)
    this.rangeDest = new Range(dest,dest+len)
    this.diff = dest - orig
  }
  
  get destStart(){return this.dest}
  get destEnd(){return this.dest + this.len} // included
  get origStart(){return this.orig}
  get origEnd(){return this.orig + this.len} // included

  isInDest(n:number):boolean{
    return this.rangeDest.isIn(n)
  }

  isInOrig(n:number):boolean{
    return this.rangeOrig.isIn(n)
  }

  //gets the number from orig an returns the number from dest
  //orig to dest
  in(n:number):number | undefined{
    if(!this.isInOrig(n)) return undefined
    return n + this.diff
  }

  //gets the number from dest an returns the number from orig
  //dest to orig
  out(n:number):number | undefined{
    if(!this.isInDest(n)) return undefined
    return n - this.diff
  }

  toString(){
    return `${this.rangeOrig}»${this.rangeDest}`
  }
  
}



export class Range{
  //end is included in the range
  constructor(public start:number,public end:number){  }

  isIn(n:number){
    return n>= this.start && n <= this.end
  }

  //returns offset
  off(n:number):number{
    return n - this.start
  }

  toString(){
    return `[${this.start}...${this.end}]`
  }

}