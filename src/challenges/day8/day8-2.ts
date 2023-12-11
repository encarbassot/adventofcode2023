

export default function (value:string){
  return trace(parseInput(value))
}

type directionsType = string[]

type nodeType = {
  origin:string,
  L:string,
  R:string,
  isStart:boolean
}

type indicationType = {
  directions:directionsType,
  map:NodeObjectType
}

type NodeObjectType = {
  [key: string]: nodeType;
};







export function trace({directions,map}:indicationType){
  
  let steps = 0
  let cells = Object.values(map).filter(x=>x.isStart)
  // console.log(cells.map(x=>x.origin))
  let allEndingZ = false


  while(!allEndingZ){

    for(let i=0;i<directions.length;i++){
      
      steps++

      if(steps%1000000===0) console.log(steps, cells.map(x=>x.origin))

      const d = directions[i]
      const newCells:nodeType[] = []

      for (const c of cells) {
        const nextMeStr = c[d]
        const nextCell = map[nextMeStr]
        newCells.push(nextCell)
      }

      
      cells = newCells
      // console.log(cells.map(x=>x.origin))
      allEndingZ = cells.every(x=>x.origin[2] === "Z")

    }


  }



  return steps
}








export function parseInput(value:string):indicationType{


  const [directionsStr,mapStr] = value.split("\n\n")
  
  const directions = directionsStr.split("") as directionsType

  const mapLines = mapStr.split("\n")
  
  const map:NodeObjectType = {}
  for (const row of mapLines) {
    
 
    const [origin,dest] = row.split(" = (")
    const [left,right] = dest.replaceAll(")","").split(", ")

    const newNode = {
      isStart:origin[2] === "A",
      origin,
      L:left,
      R:right
    } as nodeType

    map[origin] = newNode
  }

  return {directions,map}

}