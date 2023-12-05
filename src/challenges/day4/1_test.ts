import { expect, test, describe} from "bun:test"
import challenge1 from "./day4"
import challenge2 from "./day4-2"

const file = Bun.file("assets/inputs/DAY4.txt");
const challengeInputFile = await file.text();


const testValue1 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

const row1 = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"


describe('FIRST CHALLENGE', () => { 
  test(testValue1, ()=>{
    expect(challenge1(testValue1)).toBe(13)  
  })
  
  
  test(row1, ()=>{
    expect(challenge1(row1)).toBe(8)
  })
  
  test("CHALLENGE INPUT FILE", ()=>{
    const result = challenge1(challengeInputFile)
    console.log(result)
    expect(result).toBe(result)
  })
})


describe('SECOND CHALLENGE', () => { 
  test(testValue1, ()=>{
    expect(challenge2(testValue1)).toBe(30)  
  })
  
  
  
  test("CHALLENGE INPUT FILE", ()=>{
    const result = challenge2(challengeInputFile)
    console.log(result)
    expect(result).toBe(result)
  })
})
