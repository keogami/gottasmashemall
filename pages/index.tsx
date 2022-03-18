import {Component} from 'react'
import Image from 'next/image'

type Input = symbol

const [INPUT_SMASH, INPUT_PASS]: Input[] = [Symbol('smash'), Symbol('pass')]

type AppState = {
  smashed: number[]
  current: number
  image: string
}
class Home extends Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      smashed: [],
      current: 1,
      image: 'https://raw.githubusercontent.com'
    }
  }

  componentDidMount() {
    this.loadPokemon(this.state.current)
  }

  loadPokemon(id: number) {
    this.setState({
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    })
  }

  handleInput(input: Input) {
    const newState = {
      current: this.state.current + 1,
      smashed: (input === INPUT_SMASH) ? [...this.state.smashed, this.state.current] : this.state.smashed,
    }
    this.setState(newState)
    this.loadPokemon(newState.current)
    console.log(newState.smashed)
  }
  
  render() {
    return <>
      <Image
        src={this.state.image}
        alt='scyther'
        width={475}
        height={475}
      />

      <button
        id='smash'
        onClick={() => this.handleInput(INPUT_SMASH)}
      >
      Smash
      </button>

      <button
        id='smash'
        onClick={() => this.handleInput(INPUT_PASS)}
      >
      Pass
      </button>
    </>
  }
}

export default Home

