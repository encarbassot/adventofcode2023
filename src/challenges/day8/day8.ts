

export default function (value:string){
  return trace(parseInput(value))
}

type directionsType = string[]

type nodeType = {
  origin:string,
  L:string,
  R:string
}

type indicationType = {
  directions:directionsType,
  map:nodeType[]
}







export function trace({directions,map}:indicationType){

  let cell = map.find(x=>x.origin === "AAA")
  let steps = 0
  if(!cell) return
  
  // console.log(cell?.origin)

  while(cell.origin !== "ZZZ"){
    for(let i=0;i<directions.length;i++){
      steps ++
      const d = directions[i]
      const newCellName = cell[d]
      
      const newCell = map.find(x=>x.origin === newCellName)
      if(!newCell) return 

      // console.log(newCell.origin)
      
      cell = newCell
    }



  }

  return steps
}








export function parseInput(value:string):indicationType{


  const [directionsStr,mapStr] = value.split("\n\n")
  
  const directions = directionsStr.split("") as directionsType

  const map = mapStr.split("\n").map(row=>{
    const [origin,dest] = row.split(" = (")
    const [left,right] = dest.replaceAll(")","").split(", ")

    return {
      origin,
      L:left,
      R:right
    } as nodeType
  })

  return {directions,map}

}