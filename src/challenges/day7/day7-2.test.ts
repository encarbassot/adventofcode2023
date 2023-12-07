import { expect, test, describe} from "bun:test"
import challenge2, { checkHandType, compareHands, handType, makeJSON, sortHands } from "./day7-2"

const file = Bun.file("assets/inputs/DAY7.txt");
const challengeInputFile = await file.text();

const inputTest1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

describe("SECOND CHALLENGE",()=>{

  test("PARSE INPUT",()=>{
    const hands = makeJSON(inputTest1)
    expect(hands[0]).toEqual({hand:["3","2","T","3","K"],bid:765})
  })

  describe("HAND TYPES",()=>{
    test("FULL",()=>{
      expect(checkHandType(makeHand("AAAAA"))).toBe(0)
    })

    test("FOUR",()=>{
      expect(checkHandType(makeHand("KAAAA"))).toBe(1)
    })

    test("FOUR* QJJQ2",()=>{
      expect(checkHandType(makeHand("QJJQ2"))).toBe(1)
    })

    test("HOUSE",()=>{
      expect(checkHandType(makeHand("KAKAA"))).toBe(2)
    })

    test("TRIO",()=>{
      expect(checkHandType(makeHand("KAQAA"))).toBe(3)
    })

    test("2 PAIR",()=>{
      expect(checkHandType(makeHand("KAQKA"))).toBe(4)
    })

    test("PAIR",()=>{
      expect(checkHandType(makeHand("KAQAT"))).toBe(5)
    })

    test("HIGH CARD",()=>{
      expect(checkHandType(makeHand("AKQ2T"))).toBe(6)
    })

  })


  describe("COMPARE CARDS",()=>{
    test("AAAAA AAAAT",()=>{
      expect(compareHands(makeHand("AAAAA"),makeHand("AAAAT"))).toBe(1)
    })

    test("AAAAQ AAAAT",()=>{
      expect(compareHands(makeHand("AAAAQ"),makeHand("AAAAT"))).toBe(1)
    })

  })


  test("SORT HANDS",()=>{
    const hands = makeJSON(inputTest1)
    expect(sortHands(hands).map(x=>x.hand.join(""))).toEqual(["32T3K","KK677","T55J5","QQQJA","KTJJT"])
  })


  test("TEST INPUT",()=>{
    expect(challenge2(inputTest1)).toBe(5905)
  })

  test("CHALLENGE 1",()=>{
    const result = challenge2(challengeInputFile)
    console.log("challenge 2",result)
    expect(result)
  })
})




function makeHand(v:string):handType{
  const [a,b,c,d,e] = v.split("")
  return {hand:[a,b,c,d,e],bid:0}
}