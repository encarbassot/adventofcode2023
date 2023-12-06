
type raceType = [number,number] // time, record distance



export default function(value:string){

  const race = parseInput(value)
  const result = checkRace(race)

  return result
}




export function parseInput(value:string):raceType{
  const [timeStr,distanceStr] = value.split("\n")

  const time =Number(timeStr.replace("Time:","").replaceAll(" ",""))
  const distance =Number(distanceStr.replace("Distance:","").replaceAll(" ",""))

  return [time,distance]
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