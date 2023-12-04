const path = "assets/inputs/DAY3.txt"
const file = Bun.file(path);
const text = await file.text();

import {} from "../utils/objectGroupBy"

// HIGH 535946
// LOW  531748

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`


const rows:string[] = text.split("\n")
const matrix:string[][] = rows.map(row=>row.split(""))

type GearsType = {
  [key: string]: string[];
};

const gears:GearsType = {}

for(let i=0;i<matrix.length;i++){
  let buffer = ""
  let bufferIndex:number

  for(let j=0;j<matrix[i].length;j++){

    const char = matrix[i][j]

    if(!isNaN(Number(char))){
      //if is char add to buffer
      if(buffer === ""){
        bufferIndex = j
      }
      buffer +=char

    }
    
    if(
      (buffer !== "" && isNaN(Number(char))) ||        //not number and buffer full
      (j === matrix[i].length-1 && !isNaN(Number(char))) //number and last char of row
    ){
      //number ended
      const coords = hasGearArround(matrix,i,j,buffer,bufferIndex)
      if(coords){
        const {x,y} = coords
        const key =`${x}-${y}`
        if(gears[key]){
          gears[key].push(buffer)
        }else{
          gears[key] = [buffer]
        }
      }

      buffer = ""
      // bufferIndex = undefined
    }


  }
}


const result = Object.values(gears)
.filter(list => list.length === 2)
.map(([a,b])=>Number(a)*Number(b))
.reduce((acc,v)=>acc+v,0)

console.log(result)













function hasGearArround(matrix:string[][],i:number,j:number,buffer:string,bufferIndex:number):{x:number,y:null}|undefined{

  const GEAR = "*"

  const yStart = i-1
  const yEnd = i+1 +1
  const xStart = bufferIndex -1
  const xEnd = j +1

  const c = Math.max(xStart,0)
  const d = Math.min(xEnd,matrix[i].length)

  let symbols = ""

  //TOP ROW
  if(yStart>=0){
    const top = rows[yStart].substring(c,d)
    const index = top.indexOf(GEAR)
    if(index>=0){
      return {x:c+index,y:yStart}
    }
  }

  //LEFT
  if(xStart >= 0){
    const left = rows[i].charAt(xStart)
    if(left === GEAR) return {x:xStart,y:i}
  }

  //RIGHT
  if(xEnd-1 +1<rows[i].length){
    const right = rows[i].charAt(xEnd-1)
    if(right === GEAR) return {x:xEnd-1,y:i}
  }

  //BOTTOM ROW
  if(yEnd < matrix.length){
    const bottom = rows[yEnd-1].substring(c,d)
    const index = bottom.indexOf(GEAR)
    if(index>=0){
      return {x:c+index,y:yEnd-1}
    }
  }
  
  const hasSymb = symbols.split("").some(x=> x==="*" )


}