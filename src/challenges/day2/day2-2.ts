const path = "assets/inputs/DAY2.txt"
const file = Bun.file(path);
const text = await file.text();

import {} from "../../utils/objectGroupBy"

type cubeType = {
  color:colorType
  n:number
}

type colorType = "red" | "green" | "blue"
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

    for (const color of colors) {
      if(cube.includes(color)){
        result.color=color
        result.n = Number(cube.replace(color,""))
      }
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


const resultGames = games.map(({sets})=>{

  const mins = sets.map(set=>
    set.reduce((acc,{color,n})=>{
      const j = colors.indexOf(color)
      const result = [...acc]
      result[j] += n
      return result
    },[0,0,0])
  ).reduce((acc, [r,g,b]) => ({
    r: Math.max(acc.r, r),
    g: Math.max(acc.g, g),
    b: Math.max(acc.b, b),
  }), {r:0, g:0, b:0})

  const power = mins.r * mins.g * mins.b

  return {...mins, power}
})

console.log(resultGames)

const result = resultGames.reduce((acc,v)=>acc+v.power,0)

console.log(result)
