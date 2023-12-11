type pointType = {x:number,y:number}


export default function (value:string){

  const galaxys = parseInput(value)

  let total = 0


  for(let i=0;i<galaxys.length;i++){
    const a = galaxys[i]
    for(let j=i+1;j<galaxys.length;j++){
      const b = galaxys[j]

      total += getPairDistance(a,b)
    }
  }

  return total
}



export function getPairDistance(a:pointType,b:pointType){
  return Math.max(a.x,b.x)-Math.min(a.x,b.x) + Math.max(a.y,b.y)-Math.min(a.y,b.y)
}



export function parseInput(value:string){
  const grid = value.split("\n").map(x=>x.split(""))

  const emptyColumns:number[]=[]
  const emptyRows:number[]=[]
  const galaxyCoords:pointType[] = []

  //check rows
  for(let i=0;i<grid.length;i++){
    
    let isRowEmpty = true
    for(let j=0;j<grid[i].length && isRowEmpty;j++){
      const cell = grid[i][j]  
      if(cell !== "."){
        isRowEmpty = false
      }
    }

    if(isRowEmpty){
      emptyRows.push(i)
    }

  }


  //check columns
  for(let i=0;i<grid[0].length;i++){
  
    let isColEmpty = true
    for(let j=0;j<grid.length && isColEmpty;j++){
      const cell = grid[j][i]  
      if(cell !== "."){
        isColEmpty = false
      }
    }

    if(isColEmpty){
      emptyColumns.push(i)
    }

  }


  //galaxy coordinates
  for(let i=0;i<grid.length;i++){
  
    const overcomeGapsCol = emptyRows.filter(k=>i>k)
    const y = i + overcomeGapsCol.length

    for(let j=0;j<grid[i].length;j++){

      const overcomeGapsRow = emptyColumns.filter(k=> k<j)
      const x = j + overcomeGapsRow.length

      const cell = grid[i][j]

      if(cell === "#"){
        galaxyCoords.push({y,x})
      }
      
    }
  }

  



  // console.log(galaxyCoords)
  return galaxyCoords
}