const path = "assets/inputs/DAY1.txt"
const file = Bun.file(path);
const text = await file.text();


const strNumbers = ["one","two","three","four","five","six","seven","eight","nine"]

const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const value = text


const rows = value.split("\n").map(row=>{
  
  const len:number = row.length

  let firstNum:number
  let firstNumIndex:number = len

  let lastNum:number
  let lastNumIndex:number = -1

  for(let i=0;i<strNumbers.length;i++){
    const j = i+1
    const num = String(j)
    const strNum = strNumbers[i]

    const startNum = isp(row.indexOf(num))
    const startStr = isp(row.indexOf(strNum))
    
    const endNum = isp(row.lastIndexOf(num))
    const endStr = isp(row.lastIndexOf(strNum))

    const start = (startNum!==undefined && startStr!==undefined) ? Math.min(startNum,startStr)
    :startNum!==undefined ? startNum
    :startStr

    const end = (endNum!==undefined && endStr!==undefined) ? Math.max(endNum,endStr)
    :endNum!==undefined ? endNum
    :endStr    

    if(start !== undefined && start < firstNumIndex){
      firstNumIndex = start
      firstNum = j
    }

    if(end !== undefined && end > lastNumIndex){
      lastNumIndex = end
      lastNum = j
    }

  
  }

  return firstNum*10 + lastNum
})



console.log(rows)
console.log(rows.reduce((acc,v)=>acc+(isNaN(v)?0:v)))


function isp(n:number){//ispositive
  return n>=0?n:undefined
}



