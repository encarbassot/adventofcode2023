import { expect, test, describe} from "bun:test"
import challenge1, {checkRace, parseInput} from "./day6-2"

const file = Bun.file("assets/inputs/DAY6.txt");
const challengeInputFile = await file.text();


const testValue1 = `Time:      7  15   30
Distance:  9  40  200`


describe('SECOND CHALLENGE', () => { 

  
  test("PARSE VALUE FROM TEST VALUE",()=>{
    const inp = parseInput(testValue1)
    expect(inp).toEqual([71530,940200])
  })

  test("PARSE VALUE FROM INPUT FILE",()=>{
    const inp = parseInput(challengeInputFile)
    expect(inp).toEqual([47986698,400121310111540])
  })


  test("CHALLENGE FROM TEST VALUE",()=>{
    expect(challenge1(testValue1)).toBe(71503)
  })


  test("CHALLENGE FROM INPUT FILE",()=>{
    const result = challenge1(challengeInputFile)  
    console.log(result)
    expect(result)
  })



})
