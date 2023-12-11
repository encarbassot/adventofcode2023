import { expect, test, describe} from "bun:test"
import challenge2, { getPairDistance, parseInput } from "./day11-2"

const file = Bun.file("assets/inputs/DAY11.txt");
const challengeInputFile = await file.text();


const testInput1  = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`



describe("CHALLENGE 2",()=>{



  test("PARSE INPUT EXP 1",()=>{
    expect(challenge2(testInput1,2)).toBe(374)
  })
  

  test("PARSE INPUT EXP 10",()=>{
    expect(challenge2(testInput1,10)).toBe(1030)
  })
  
  test("PARSE INPUT EXP 100",()=>{
    expect(challenge2(testInput1,100)).toBe(8410)
  })


  test("CHALLENGE EXP 1000000",()=>{
    const result = challenge2(challengeInputFile)
    console.log("CHALLENGE 2",result)
    expect(result)
  })
  
})