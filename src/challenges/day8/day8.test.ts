import { expect, test, describe} from "bun:test"
import challenge1, { parseInput, trace} from "./day8"

const file = Bun.file("assets/inputs/DAY8.txt");
const challengeInputFile = await file.text();



const testInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const testInput2=`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`


describe('FIRST CHALLENGE', () => { 

  test("PARSE INPUT 1 DIRECTIONS",()=>{
    expect(parseInput(testInput1).directions).toEqual(["R","L"])
  })


  test("PARSE INPUT 2 DIRECTIONS",()=>{
    expect(parseInput(testInput2).directions).toEqual(["L","L","R"])
  })


  test("PARSE INPUT 1 MAP",()=>{
    expect(parseInput(testInput1).map[0]).toEqual({L:"BBB",R:"CCC",origin:"AAA"})
  })

  test("TRACE INPUT 1",()=>{
    expect(trace(parseInput(testInput1))).toBe(2)
  })

  test("TRACE INPUT 2",()=>{
    expect(trace(parseInput(testInput2))).toBe(6)
  })

  test("TRACE INPUT FILE",()=>{
    const result = challenge1(challengeInputFile)
    console.log(result)
    expect(result)
  })

  

})