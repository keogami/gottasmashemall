import {Component} from 'react'
import Image from 'next/image'

type Input = symbol

const [INPUT_SMASH, INPUT_PASS]: Input[] = [Symbol('smash'), Symbol('pass')]

class Home extends Component {
  handleInput(input: Input) {
    console.log(input)
  }
  
  render() {
    return <>
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png'
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
      Smash
      </button>
    </>
  }
}

export default Home

