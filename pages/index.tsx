import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Gotta Smash Em All</title>
    </Head>

    <Image
      src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' 
      width={475}
      height={475}
      alt='Pokemon'
    />

    <button>Smash</button><button>Pass</button>
  </>
)

export default Home

