
type seedType = number
type conversionType = {from:string,to:string,conversions:number[][]}






export default function(value:string){

  const [seeds,conversions] = makeJSON(value)

  // console.log(seeds,conversions)
  let minLocation = Infinity

  for (const s of seeds) {
    const location = checkSeed(s,conversions)
    if(location<minLocation){
      minLocation = location
    }
  }

  return minLocation
}




export function makeJSON(value:string):[seedType[],conversionType[]]{
  const [__seeds,...conversions] = value.split("\n\n")

  var [_,_seeds] = __seeds.split("seeds: ")
  var seedsList = _seeds.split(" ").map(Number)
  
  const seeds:number[] = []
  for(let i=0;i<seedsList.length;i+=2){
    const range = seedsList[i]
    const len = seedsList[i+1]
    for(let j=0;j<len;j++){
      seeds.push(range+j)
    }
  }

  const conversionsList = conversions.map(x=>{
    const [title,convs]=x.split(" map:\n")
    const [from,to] = title.split("-to-")
    return {
      from,
      to,
      conversions:convs.split("\n").map(y=>y.split(" ").map(Number))
    }
  })
  

  return [seeds,conversionsList]
}







export function checkSeed(seed:seedType,conversions:conversionType[]){

  // console.log(seed)
  let result = seed
  for (const conv of conversions) {
    result = checkSeedSingle(result,conv)
    // console.log(result)
  }

  return result
}


export function checkSeedSingle(seed:seedType,{conversions}:conversionType){

  for (const [destinationRange,sourceRange,rangeLength] of conversions) {
    if(seed>=sourceRange && seed <= sourceRange+rangeLength){
      const dif = destinationRange - sourceRange
      return seed + dif
    }
    
  }

  return seed
}