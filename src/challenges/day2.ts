const path = "assets/inputs/DAY2.txt"
const file = Bun.file(path);
const text = await file.text();

import {} from "../utils/objectGroupBy"

type cubeType = {
  color:colorType
  n:number
}

type colorType = "blue" | RED | GREEN
const RED:colorType = "red"
const GREEN:colorType = "green"
const BLUE:colorType = "blue"

const colors:colorType[] = [RED,GREEN,BLUE]


const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const value =  text

const games = value.split("\n").map(row=>{
  const [game,value] = row.split(": ")
  const sets = value.split(";").map(set=>set.split(", ").map(cube=>{
    const result:cubeType = {color:RED,n:0}

    if(cube.includes(BLUE)){
      result.color = BLUE
      result.n = Number(cube.replace(BLUE,""))
    }else if(cube.includes(RED)){
      result.color = RED
      result.n = Number(cube.replace(RED,""))
    }else if(cube.includes(GREEN)){
      result.color = GREEN
      result.n = Number(cube.replace(GREEN,""))
    }

    return result
  }))
  
  return {
    sets,
    game,
    n:Number(game.replace("Game ","")),
    row
  }
})


const resultGames = games.map(({sets,n})=>{
  let viable = true

  

  for (const set of sets) {
    let green = 0
    let red = 0
    let blue = 0
  
    for (const {color,n} of set) {
      if(color === RED){
        red += n
      }else if (color === GREEN) {
        green +=n
      }else if(color === BLUE){
        blue +=n
      }
    }
  
    viable = red<=12 && green<=13 && blue <=14 && viable
  }



  return {n,viable,sets}
})


const result = resultGames.filter(x=>x.viable).reduce((acc,v)=>{
  return acc + v.n
},0)

console.log(resultGames)
console.log(result)