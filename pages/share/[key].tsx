import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/key.module.css'

type PokemonData = {
  id: number
  name: string
}

const getSmashList = async (key: string): Promise<PokemonData[]> => {
  const resp = await fetch(`https://gottasmashemall-47a7.restdb.io/rest/smashlist?q={"key":"${key}"}`, {
    method: 'GET',
    headers: {
      'x-apikey': '6235aa84dced170e8c83a3b2',
      'Content-Type': 'application/json',
    },
  })

  const shell = await resp.json()
  const list = JSON.parse(shell[0].value)

  return list.map((it: any) => ({
    id: it.id,
    name: it.name
  }))
}

type Props = {
  title: string,
  list: PokemonData[],
  resKey: string
}

const SpriteItem = (data: PokemonData) => (
  <li title={data.name} key={data.id}>
    <Image
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
      alt={data.name}
      width={96} height={96}
    />
  </li>
)

const Page: NextPage<Props, {}> = ({title, list, resKey}) => {
  return (
  <div className={styles.Body}>
    <Head>
      <title>{title}</title>
    </Head>
    <h1 className={styles.Logo}>Gotta Smash Em All</h1>
    <main className={styles.main}>
      <h2>The Smashed Ones</h2>
      <ul id={resKey}>
        {list.map(SpriteItem)}
      </ul>
    </main>
  </div>
  )
}

export async function getServerSideProps({ query: { key } }: any) {
  return {
    props: {
      title: `The Smashed Ones | ${key}`,
      list: await getSmashList(key as string),
      resKey: key,
    }
  }
}

export default Page
