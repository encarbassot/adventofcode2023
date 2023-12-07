
import {} from "../../utils/objectGroupBy"

type cardType = "A"| "K"| "Q"| "J"| "T"| "9"| "8"| "7"| "6"| "5"| "4"| "3"| "2"
const CARDS:cardType[] = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

export type handType = {
  hand:[string,string,string,string,string],
  bid:number
}

export default function (value:string){

  const cards = sortHands(makeJSON(value))
  let total = 0

  for(let i=0;i<cards.length;i++){
    const rank = i+1
    total += rank*cards[i].bid
  }

  return total
}



export function sortHands(hands:handType[]){
  return hands.sort(compareHands)
}






export function makeJSON(value:string):handType[]{
  return value.split("\n").map(x=>{
    const [hand,bid] = x.split(" ")
    const [a,b,c,d,e] = hand.split("")
    return {
      hand:[a,b,c,d,e]
      ,bid:Number(bid)
    }
  })
}



export function compareHands(a:handType,b:handType){
  //return 1 if A > B

  const levelA = checkHandType(a)
  const levelB = checkHandType(b)

  if(levelA > levelB) return -1
  if(levelB > levelA) return 1

  //else
  const handA = a.hand
  const handB = b.hand

  for(let i=0;i<handA.length;i++){
    const ca = CARDS.indexOf(handA[i] as cardType)
    const cb = CARDS.indexOf(handB[i] as cardType)

    if(ca > cb) return -1
    if(cb > ca) return 1

  }

  return 0

}



export function checkHandType({hand}:handType){
  // 0 - AAAAA
  // 1 - AAAA?
  // 2 - AAABB
  // 3 - AAA??
  // 4 - AABB?
  // 5 - AA???
  // 6 - no repeat

  const group = Object.values(Object.groupBy(hand,(h:string)=>h)) as string[][]


  if(group.length===1 && group[0].length === 5) return 0
  if(group.length===2 && group.some(x=>x.length===4))return 1
  if(group.some(x=>x.length===3)){
    if(group.some(x=>x.length===2)) return 2
    return 3
  }

  const pairs = group.filter(x=>x.length===2)
  if(pairs.length === 2) return 4
  if(pairs.length === 1) return 5
  return 6

}