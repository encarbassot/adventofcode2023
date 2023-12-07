
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
    console.log(location,minLocation)
  }

  return minLocation
}




export function makeJSON(value:string):[seedType[],conversionType[]]{
  const [_seeds,...conversions] = value.split("\n\n")

  var [_,seeds] = _seeds.split("seeds: ")
  var seedsList = seeds.split(" ").map(Number)
  
  const seedRanges:number[] = []
  for(let i=0;i<seedsList.length;i+=2){
    const from = seedsList[i]
    const len = seedsList[i+1]
    for(let i=0;i<len;i++){
      seedRanges.push(from+i)
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
  

  return [seedRanges,conversionsList]
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