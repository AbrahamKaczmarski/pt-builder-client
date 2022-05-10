export const pokedex = {
  Bulbasaur: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
  Caterpie: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png',
  Charmander: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
  Clefairy: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png',
  Ekans: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/023.png',
  Jigglypuff: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png',
  Nidoran: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/029.png',
  Oddish: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png',
  Pidgey: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png',
  Pikachu: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
  Rattata: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png',
  Sandshrew: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/027.png',
  Spearow: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/021.png',
  Squirtle: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
  Weedle: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png',
  Zubat: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/041.png'
}

export const ruleParams = {
  rulesStrong: {
    normal: ['figth'],
    figth: ['flying', 'psychic', 'fairy'],
    flying: ['rock', 'electric', 'ice'],
    poison: ['ground', 'psychic'],
    ground: ['water', 'grass', 'ice'],
    rock: ['figth', 'ground', 'steel', 'water', 'grass'],
    bug: ['flying', 'rock', 'fire'],
    ghost: ['ghost', 'dark'],
    stell: ['figth', 'ground', 'fire'],
    fire: ['ground', 'rock', 'water'],
    water: ['grass', 'electric'],
    grass: ['flying', 'poison', 'bug', 'fire', 'ice'],
    electric: ['ground'],
    psychic: ['bug', 'ghost', 'dark'],
    ice: ['figth', 'rock', 'stell', 'fire'],
    dragon: ['ice', 'dragon', 'fairy'],
    dark: ['figth', 'bug', 'fairy'],
    fairy: ['poison', 'stell']
  },
  rulesWeak: {
    normal: ['rock', 'ghost', 'steel'],
    figth: ['flying', 'poison', 'bug', 'ghost', 'psychic', 'fairy'],
    flying: ['rock', 'steel', 'electric'],
    poison: ['poison', 'ground', 'rock', 'ghost', 'steel'],
    ground: ['flying', 'bug', 'grass'],
    rock: ['figth', 'ground', 'steel'],
    bug: ['figth', 'poison', 'ghost', 'steel', 'fire', 'fairy'],
    ghost: ['normal', 'dark'],
    stell: ['steel', 'fire', 'water', 'electric'],
    fire: ['rock', 'fire', 'water', 'dragon'],
    water: ['water', 'grass', 'dragon'],
    grass: ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon'],
    electric: ['ground', 'grass', 'electric', 'dragon'],
    psychic: ['steel', 'psychic', 'dark'],
    ice: ['steel', 'fire', 'water', 'ice'],
    dragon: ['steel', 'fairy'],
    dark: ['figth', 'dark', 'fairy'],
    fairy: ['poison', 'stell', 'fire']
  }
}

export const teams = [
  {
    created: '2022/05/07',
    enemies: ['Pidgey', 'Spearow'],
    id: 1,
    name: 'Team 1',
    picks: ['Nidoran', 'Rattata'],
    public: false
  },
  {
    created: '2022/05/07',
    enemies: ['Bulbasaur', 'Caterpie', 'Weedle'],
    id: 2,
    name: 'Team 2',
    picks: ['Charmander', 'Pidgey', 'Zubat'],
    public: true
  },
  {
    created: '2022/05/07',
    enemies: ['Clefairy', 'Zubat', 'Ekans', 'Sandshrew'],
    id: 3,
    name: 'Team 3',
    picks: ['Zubat', 'Pikachu', 'Sandshrew', 'Squirtle'],
    public: false
  }
]
