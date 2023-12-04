const path = "assets/inputs/DAY4.txt"
const file = Bun.file(path);
const text = await file.text();

import {} from "../utils/objectGroupBy"

const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`


const value = text

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






// console.log(cards)

console.log(`Result is ${total}`)