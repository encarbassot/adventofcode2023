import { expect, test, describe} from "bun:test"
import challenge2, { parseInput, trace} from "./day8-2"

const file = Bun.file("assets/inputs/DAY8.txt");
const challengeInputFile = await file.text();



const testInput1 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`




describe('SECOND CHALLENGE', () => { 

  test("PARSE INPUT 1 DIRECTIONS",()=>{
    expect(parseInput(testInput1).directions).toEqual(["L","R"])
  })


  test("PARSE INPUT 1 MAP",()=>{
    expect(parseInput(testInput1).map["11A"]).toEqual({L:"11B",R:"XXX",origin:"11A",isStart:true})
  })

  test("TRACE INPUT 1",()=>{
    expect(trace(parseInput(testInput1))).toBe(6)
  })

  test("TRACE INPUT FILE",()=>{
    const result = challenge2(challengeInputFile)
    console.log(result)
    expect(result)
  })

  

})