import {Component} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

type Input = symbol

const [INPUT_SMASH, INPUT_PASS]: Input[] = [Symbol('smash'), Symbol('pass')]

type PokemonData = {
  id: number
  image: string
  sprite: string
  name: string
}

const SmashItem = (data: PokemonData) => (
  <li key={data.id}>
    <Image
      src={data.sprite}
      width={96} height={96}
      alt={data.name}
    />
  </li>
)

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
        id: 0,
        image: 'https://raw.githubusercontent.com',
        sprite: 'https://raw.githubusercontent.com',
        name: 'MissingNo.'
      },
    }
  }

  componentDidMount() {
    this.loadNextPokemon()
  }

  loadNextPokemon() {
    const id = this.state.current.id + 1
    this.setState({
      current: {
        id: id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        name: String(id),
      }
    })
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
        <Image
          src={this.state.current.image}
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
          Smash
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

      <ul className={styles.smashList}>
        {this.state.smashed.map(SmashItem)}
      </ul>
    </div>
  }
}

export default Home

