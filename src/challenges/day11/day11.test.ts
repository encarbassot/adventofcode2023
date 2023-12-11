import { expect, test, describe} from "bun:test"
import challenge1, { getPairDistance, parseInput } from "./day11"

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

describe("CHALLENGE 1",()=>{

  describe("PARSE INPUT GALAXIES",() => {
    const expextResults = [
      {x:4,y:0},
      {x:9,y:1},
      {x:0,y:2},
      {x:8,y:5},
      {x:1,y:6},
      {x:12,y:7},
      {x:9,y:10},
      {x:0,y:11},
      {x:5,y:11},
    ]

    for(let i=0;i<expextResults.length;i++){
    
      test("GALAXY " + (i+1),()=>{
        expect(parseInput(testInput1)[i]).toEqual(expextResults[i])
      })
    }

  })


  test("CALC DISTANCE",()=>{
    expect(getPairDistance({x:1,y:6},{x:5,y:11})).toBe(9)
  })


  test("INPUT TEST 1",()=>{
    expect(challenge1(testInput1)).toBe(374)
  })



  test("CHALLENGE",()=>{
    const total = challenge1(challengeInputFile)
    console.log("CHALLENGE 1",total)
    expect(total)
  })

})


