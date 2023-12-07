import { expect, test, describe} from "bun:test"
import challenge1, { checkHandType, compareHands, handType, makeJSON, sortHands } from "./day7"

const file = Bun.file("assets/inputs/DAY7.txt");
const challengeInputFile = await file.text();

const inputTest1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

describe("FIRST CHALLENGE",()=>{

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
      expect(checkHandType(makeHand("AKQJT"))).toBe(6)
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
    expect(sortHands(hands).map(x=>x.hand.join(""))).toEqual(["32T3K","KTJJT","KK677","T55J5","QQQJA"])
  })


  test("TEST INPUT",()=>{
    expect(challenge1(inputTest1)).toBe(6440)
  })

  test("CHALLENGE 1",()=>{
    const result = challenge1(challengeInputFile)
    console.log("challenge 1",result)
    expect(result)
  })
})




function makeHand(v:string):handType{
  const [a,b,c,d,e] = v.split("")
  return {hand:[a,b,c,d,e],bid:0}
}