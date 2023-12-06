import { expect, test, describe} from "bun:test"
import challenge1, { checkSeed, checkSeedSingle, makeJSON } from "./day5"

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
    expect(seeds1).toEqual([79,14,55,13])
  })




  describe('SEEDS TO SOIL', () => { 
    const results = [81,14,57,13]
    for(let i=0;i<seeds1.length;i++){
      const s = seeds1[i]
      test(`SEED ${i} (${s})`, ()=>{
        expect(checkSeedSingle(s,conv1[0])).toBe(results[i])
      })
    }
  })

  describe('SEEDS TO LOCATION', () => { 
    const results = [82,43,86,35]
    for(let i=0;i<seeds1.length;i++){
      const s = seeds1[i]
      test(`SEED ${i} (${s})`, ()=>{
        expect(checkSeed(s,conv1)).toBe(results[i])
      })
    }
  })






  // test("SEEDS FROM JSON",()=>{
  //   expect(checkSeed(seeds1[1],conv1)).toBe(82)
  // })

  
  
  test("FULL TEST INPUT", ()=>{
    expect(challenge1(testValue1)).toBe(35)
  })

  test("CHALLENGE INPUT FILE", ()=>{
    const result = challenge1(challengeInputFile)
    console.log(result)
    expect(result).toBe(result)
  })
})
