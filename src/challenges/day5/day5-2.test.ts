import { expect, test, describe} from "bun:test"
import challenge2, { getLeastRanges, makeJSON } from "./day5-2"

const file = Bun.file("assets/inputs/DAY5.txt");
const challengeInputFile = await file.text();


const testValue1 = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`


describe('SECOND CHALLENGE', () => { 


  const [seeds1,ranges1] = makeJSON(testValue1)

  



  test("LAST RANGE LEAST VALUE", ()=>{
    expect(getLeastRanges(ranges1[ranges1.length-1])).toEqual([
      [0,0],
      []
    ])
  })

  
  // test("FULL TEST INPUT", ()=>{
  //   expect(challenge2(testValue1)).toBe(46)
  // })

  // test("CHALLENGE INPUT FILE", ()=>{
  //   const result = challenge2(challengeInputFile)
  //   console.log(result)
  //   expect(result).toBe(result)
  // })
})
