import { expect, test, describe} from "bun:test"
import challenge2, { checkSeed, checkSeedSingle, makeJSON } from "./day5-2-bruteforce"

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


describe('FIRST CHALLENGE', () => { 

  const [seeds1,conv1] = makeJSON(testValue1)

  test("SEEDS FROM JSON",()=>{
    console.log(seeds1)
    expect(seeds1).toEqual([
      79,80,81,82,83,84,85,86,87,88,89,90,91,92,
      55,56,57,58,59,60,61,62,63,64,65,66,67
    ])
  })






  test(`SEED 82`, ()=>{
    expect(checkSeed(82,conv1)).toBe(46)
  })






  // test("SEEDS FROM JSON",()=>{
  //   expect(checkSeed(seeds1[1],conv1)).toBe(82)
  // })

  
  
  test("FULL TEST INPUT", ()=>{
    expect(challenge2(testValue1)).toBe(46)
  })

  test("CHALLENGE INPUT FILE", ()=>{
    const result = challenge2(challengeInputFile)
    console.log(result)
    expect(result).toBe(result)
  })
})
