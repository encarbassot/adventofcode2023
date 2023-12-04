const path = "assets/inputs/DAY1.txt"
const file = Bun.file(path);
const text = await file.text();

const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const value = text


const rows = value.split("\n").map(x=>{
  const chars = x.split("")

  let firstNum:number|undefined,lastNum:number|undefined

  for(let i=0;i<chars.length;i++){
  
    const a = Number(chars[i])
    const b = Number(chars[chars.length-1-i])

    if(!firstNum && !isNaN(a)){
      firstNum = a
    }

    if(!lastNum && !isNaN(b)){
      lastNum = b
    }

    if(firstNum && lastNum) break
  }

  

  return firstNum*10 +lastNum
})



console.log(rows)
console.log(rows.reduce((acc,v)=>acc+(isNaN(v)?0:v)))