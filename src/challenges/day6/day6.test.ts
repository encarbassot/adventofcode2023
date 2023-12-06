import { expect, test, describe} from "bun:test"
import challenge1, {checkRace, parseInput} from "./day6"

const file = Bun.file("assets/inputs/DAY6.txt");
const challengeInputFile = await file.text();


const testValue1 = `Time:      7  15   30
Distance:  9  40  200`


describe('FIRST CHALLENGE', () => { 

  
  test("PARSE VALUE FROM TEST VALUE",()=>{
    const inp = parseInput(testValue1)
    expect(inp).toEqual([[7,9],[15,40],[30,200]])
  })

  test("PARSE VALUE FROM INPUT FILE",()=>{
    const inp = parseInput(challengeInputFile)
    expect(inp).toEqual([[47,400],[98,1213],[66,1011],[98,1540]])
  })


  
  describe("CHECK RACES",()=>{
    const expectedResults = [4,8,9]

    const races = parseInput(testValue1)
    for(let i=0;i<races.length;i++){
      test(`RACE ${i} TEST`,()=>{
        expect(checkRace(races[i])).toBe(expectedResults[i])
    
      })
    }
  })



  test("CHALLENGE FROM TEST VALUE",()=>{
    expect(challenge1(testValue1)).toBe(288)
  })


  test("CHALLENGE FROM INPUT FILE",()=>{
    const result = challenge1(challengeInputFile)  
    console.log(result)
    expect(result)
  })



})
