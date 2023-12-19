import { expect, test, describe} from "bun:test"
import challenge1, { getWorkflowByName, parseInput, partThroughWork, partThroughWorkFlow } from "./day19"

const file = Bun.file("assets/inputs/DAY19.txt");
const challengeInputFile = await file.text();

/*
  x: Extremely cool looking
  m: Musical (it makes a noise when you hit it)
  a: Aerodynamic
  s: Shiny
*/

const testInput1  = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`

describe("CHALLENGE 1",()=>{


    
  test("PARSE INPUT workflow",()=>{
    expect(parseInput(testInput1).workflows[0]).toEqual({
      name:"px",
      rules:[
        {
          conditionChar:"a",
          conditionLogic:"<",
          conditionAmount:2006,
          destiny:"qkq"
        },{
          conditionChar:"m",
          conditionLogic:">",
          conditionAmount:2090,
          destiny:"A"
        }
      ],
      elseRule:"rfg"
    })
  })

  test("PARSE INPUT part",()=>{
    expect(parseInput(testInput1).parts[0]).toEqual(
      {x:787,m:2655,a:1222,s:2876}
    )
  })

  test("Piece through work",()=>{
    const {parts,workflows} = parseInput(testInput1)
    const workIn = getWorkflowByName(workflows,"in")
    if(workIn === undefined) return
    expect(partThroughWork(parts[0],workIn)).toBe("qqz")
  })

  test("Piece through work 2",()=>{
    const {parts,workflows} = parseInput(testInput1)
    const workIn = getWorkflowByName(workflows,"in")
    if(workIn === undefined) return
    expect(partThroughWork(parts[1],workIn)).toBe("px")
  })


  describe("TEST ALL PIECES",()=>{
    const {parts,workflows} = parseInput(testInput1)
    const partAccepted = [true,false,true,false,true]
    for (let i=0; i<parts.length;i++) {
      const part = parts[i]
      test("Piece through workflow",()=>{
        expect(partThroughWorkFlow(part,workflows)).toBe(partAccepted[i])
      })
    }

  })





  test("INPUT TEST 1",()=>{
    expect(challenge1(testInput1)).toBe(19114)
  })



  test("CHALLENGE",()=>{
    const total = challenge1(challengeInputFile)
    console.log("CHALLENGE 1",total)
    expect(total)
  })

})


