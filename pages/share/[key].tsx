import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

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
  <li key={data.id}>
    <Image
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
      alt={data.name}
      width={96} height={96}
    />
  </li>
)

const Page: NextPage<Props, {}> = ({title, list, resKey}) => {
  return (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    The Smashed Ones:
    <ul id={resKey}>
      {list.map(SpriteItem)}
    </ul>
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
