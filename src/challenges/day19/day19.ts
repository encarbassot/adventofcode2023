import {} from "../../utils/objectGroupBy"

type ruleType = {
  conditionChar:string,
  conditionLogic: ">" | "<",
  conditionAmount:number,
  destiny:string
}

type workflowType = {
  name:string,
  rules:ruleType[],
  elseRule:string
}



type partType = {[key: string]: number}


export default function (value:string,startWith="in"){

  const {parts,workflows} = parseInput(value)

  const partsAccepted = parts.filter(x=>partThroughWorkFlow(x,workflows))

  return addParts(partsAccepted)

}


export function addParts(parts:partType[]){
  return parts.reduce((acc,v)=>acc + v.x + v.m + v.a + v.s,0)
}

export function partThroughWorkFlow(part:partType,workflows:workflowType[],startWith="in"):boolean{
  let workflowName = startWith
  let workflow = getWorkflowByName(workflows,workflowName)

  while(workflowName !== "A" && workflowName !=="R"){
    if(workflow===undefined) throw new Error("workflow not found")
    const nextName = partThroughWork(part,workflow)
    // console.log(nextName)
    const nextWork = getWorkflowByName(workflows,nextName)

    workflow=nextWork
    workflowName = nextName
  }

  return workflowName === "A"

}

export function partThroughWork(part:partType,workflow:workflowType){

  for (const rule of workflow.rules) {
    const {conditionChar:c,conditionLogic:l,conditionAmount:n,destiny:d} = rule
    const p = part[c]
    if(l==="<"){
      if(p < n) return d
    }else if(l===">"){
      if(p>n) return d
    }
  }

  return workflow.elseRule
}


export function getWorkflowByName(workflows:workflowType[],name:string){
  return workflows.find(x=>x.name===name)
}


export function parseInput(value:string){

  const [_workflows,_parts] = value.split("\n\n")

  const workflows = _workflows.split("\n").map(x=>{
    const [name,rest1] = x.split("{")
    const rules = rest1.replace("}","").split(",")
    const elseRule = rules.pop()

    return {
      name,
      rules:rules.map(y=>{
        const [condition,destiny] = y.split(":")
        return {
          conditionChar:condition.charAt(0),
          conditionLogic:condition.charAt(1),
          conditionAmount:Number(condition.substring(2)),
          destiny
        } as ruleType
      }),
      elseRule
    }as workflowType
  })


  const parts = _parts.split("\n").map(x=>{
    const part = x.replace("{","").replace("}","").split(",").map(y=>{
      const [a,b] = y.split("=")
      return {name:a,amount:Number(b)}
    })
    const result = {}

    for (const {name,amount} of part) {
      result[name] = amount
    }
    return result as partType
  })

  return {workflows, parts}


}