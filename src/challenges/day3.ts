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

const test = `..........
...290*891
..........
...949.189
..........
`

const rows:string[] = text.split("\n")
const matrix:string[][] = rows.map(row=>row.split(""))


let total = 0

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
      if(hasSimbolArround(matrix,i,j,buffer,bufferIndex)){
        console.log(buffer)
        total+= Number(buffer)
      }

      buffer = ""
      // bufferIndex = undefined
    }


  }
}

console.log(total)


function hasSimbolArround(matrix:string[][],i:number,j:number,buffer:string,bufferIndex:number):boolean{

  const yStart = i-1
  const yEnd = i+1 +1
  const xStart = bufferIndex -1
  const xEnd = j +1

  const c = Math.max(xStart,0)
  const d = Math.min(xEnd,matrix[i].length)

  let symbols = ""
  let top:string="",bottom:string="",left:string="",right:string=""


  // console.log("")
  // console.log(`-----(${buffer})-----`)

  //TOP ROW
  if(yStart>=0){
    top = rows[yStart].substring(c,d)
    symbols += top
  }

  //LEFT
  if(xStart >= 0){
    left = rows[i].charAt(xStart)
    symbols += left
  }
  // console.log(" ".repeat(xStart)+"|")
  // console.log(rows[i])
  // console.log("LEFT",left)

  //RIGHT
  if(xEnd-1 +1<rows[i].length){
    right = rows[i].charAt(xEnd-1)
    symbols += right
  }

  //BOTTOM ROW
  if(yEnd < matrix.length){
    bottom = rows[yEnd-1].substring(c,d)
    symbols += bottom
  }
  
  const hasSymb = symbols.split("").some(x=> isNaN(Number(x)) && x!=="." )


  // if(!hasSymb){
  //   console.log()
  //   console.log(top)
  //   console.log(left + buffer + right)
  //   console.log(bottom)
  //   console.log()
  // }



  // console.log("--------------")
  // console.log("")

  return hasSymb

}