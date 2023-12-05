
export default function (value:string){
  
  const cards = value.split("\n").map((card,i)=>{
    const[id,cardContent] = card.split(":")
    const [winners,current] = cardContent.split("|")
  
    const wNums = winners.split(" ").filter(x=>x.trim()!=="").map(x=>Number(x))
    const cNums = current.split(" ").filter(x=>x.trim()!=="").map(x=>Number(x))
  
    let total = 0
  
    for (const n of cNums) {
      if(wNums.includes(n)){
        total++
      }
    }
  
    return {
      id,
      n:i+1,
      total,
      copies:0
    }
  })
  
  let total = 0
  for(let i=0;i<cards.length;i++){
  
    const card = cards[i]
    const w = card.total
    const c = card.copies
  
    // console.log(`${card.id} copies:${card.copies}   wins:${card.total}`)
  
    for(let k=0;k<=c;k++){//for each copie + original
      total ++
  
      for(let j=0;j<w;j++){ // run all the wins
        cards[i+j+1].copies++
  
      }
    }
  
  }
  
  
  
  return total
}