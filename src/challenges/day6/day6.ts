
type raceType = [number,number] // time, record distance



export default function(value:string){

  let result = 1

  const races = parseInput(value)
  for(let i=0;i<races.length;i++){
    const ways = checkRace(races[i])
    result *= ways
  }

  return result
}




export function parseInput(value:string):raceType[]{
  const [timeStr,distanceStr] = value.split("\n")

  const time =timeStr.replace("Time:","").trim().split(" ").flatMap(x=>x===""?[]:Number(x))
  const distance =distanceStr.replace("Distance:","").trim().split(" ").flatMap(x=>x===""?[]:Number(x))

  const result:raceType[] = []
  for(let i=0;i<time.length;i++){
    result.push([time[i],distance[i]])
  }

  return result
}


//given a race check how many ways is possible to win
export function checkRace([time,recordDistance]:raceType):number{
  let total = 0

  for(let i=1;i<time;i++){
    const timeCharging = i
    const speed = timeCharging
    const timeRacing = time - timeCharging
    const distance = speed * timeRacing

    if(distance > recordDistance) total ++
  
  }

  return total
}