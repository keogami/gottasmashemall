import {Component} from 'react'
import Image from 'next/image'
import { PokemonClient } from 'pokenode-ts'
import styles from '../styles/Home.module.css'

type Input = symbol

const [INPUT_SMASH, INPUT_PASS]: Input[] = [Symbol('smash'), Symbol('pass')]

type PokemonSummary = {
  id: number
  image: string
  sprite: string
  name: string
}

type PokemonMeta = {
  height: number
  weight: number
  types: string[]
  abilities: string[]
}
const NoMeta: PokemonMeta = {height: 0, weight: 0, types: [], abilities: []}

type PokemonData = {
  summary: PokemonSummary
  meta: PokemonMeta
}

const SmashItem = (data: PokemonSummary) => (
  <li key={data.id}>
    <Image
      src={data.sprite}
      width={96} height={96}
      alt={data.name}
    />
  </li>
)

const DataWindow = ({ data }: {data: PokemonMeta}) => (
  <div>
    weight: {data.weight}<br />
    height: {data.height}<br />
    tags: {data.types.join(" , ")}<br />
    abilities: {data.abilities.join(" , ")}<br />
  </div>
)

const cRandID = (pass: number = 10): string => {
  if (pass === 0) return ''
  return Math.floor(Math.random() * 16).toString(16) + cRandID(pass - 1)
}

const generateID = (): string => {
  return (Date.now().toString(16) + cRandID()).toUpperCase()
}

const sendToDB = async (list: string) => {
  const id = generateID()
  const resp = await fetch('https://gottasmashemall-47a7.restdb.io/rest/smashlist', {
    method: "POST",
    headers: {
      'x-apikey': '6235aa84dced170e8c83a3b2',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: id,
      value: list,
    })
  })
  return resp.json()
}

const api = new PokemonClient()

type AppState = {
  smashed: PokemonData[]
  current: PokemonData
}
class Home extends Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      smashed: [],
      current: {
        summary: {
          id: 0,
          image: 'https://raw.githubusercontent.com',
          sprite: 'https://raw.githubusercontent.com',
          name: 'MissingNo.'
        },
        meta: NoMeta,
      },
    }
  }

  async serialize() {
    const data = this.state.smashed.map(it => ({id: it.summary.id, name: it.summary.name}))
    const json = JSON.stringify(data)
    
    console.log(await sendToDB(json))
  }

  componentDidMount() {
    this.loadNextPokemon()
  }

  async loadNextPokemon() {
    const id = this.state.current.summary.id + 1
    api.getPokemonById(id)
    .then(data => this.setState({
      current: {
        summary: {
          id: data.id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          name: data.name,
        },
        meta: {
          ...this.state.current.meta, weight: data.weight, height: data.height, types: data.types.map(it => it.type.name),
          abilities: data.abilities.map(it => it.ability.name),
        },
      } 
    }))
    .catch(e => console.table({id: id, err: e}))
  }

  handleInput(input: Input) {
    const newState = {
      smashed: (input === INPUT_SMASH) ? [...this.state.smashed, this.state.current] : this.state.smashed,
    }
    this.setState(newState)
    this.loadNextPokemon()
  }
  
  render() {
    return <div className={styles.papa}>
      <div className={styles.stage}>
        <DataWindow data={this.state.current.meta} />

        <Image
          src={this.state.current.summary.image}
          alt='scyther'
          width={475}
          height={475}
          layout='fixed'
        />

        <div className={styles.buttonGroup}>
          <button
            className={styles.smashButton}
            id='smash'
            onClick={() => this.handleInput(INPUT_SMASH)}
          >
          Smash {this.state.current.summary.name}
          </button>

          <button
            className={styles.passButton}
            id='smash'
            onClick={() => this.handleInput(INPUT_PASS)}
          >
          Pass
          </button>
        </div>
      </div>

      <button onClick={() => this.serialize()}>Share</button>
      <ul className={styles.smashList}>
        {this.state.smashed.map(data => data.summary).map(SmashItem)}
      </ul>
    </div>
  }
}

export default Home

