export default function (value:string){
  const computation = value.split("\n").map(card=>{
    const[id,cardContent] = card.split(":")
    const [winners,current] = cardContent.split("|")
  
    const wNums = winners.split(" ").filter(x=>x.trim()!=="").map(x=>Number(x))
    const cNums = current.split(" ").filter(x=>x.trim()!=="").map(x=>Number(x))
  
    let total = 0
  
    for (const n of cNums) {
      if(wNums.includes(n)){
        total = total===0?1:total*2
      }
    }
  
    return {
      id,
      winners:wNums,
      current:cNums,
      total
    }
  })
  
  
  // console.log(computation)
  
  const result = computation.reduce((acc,v)=>acc+v.total,0)
  // console.log(`Result is ${result}`)

  return result
}

