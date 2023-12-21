import Head from 'next/head'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'
import Player from '../components/Player';
import { getSession } from 'next-auth/react';


export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>

        <title>Spotify Clone</title>
      </Head>
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  if (!session) {
    // Redirigir al usuario a la página de login si no hay una sesión activa
    return {
      redirect: {
        destination: '/login', // Ruta de la página de login
        permanent: false,
      },
    };
  }

  return{
    props: {
      session,
    },
  };
}