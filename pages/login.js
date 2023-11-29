import { getProviders, signIn } from "next-auth/react"
import Image from 'next/image';
import spotifyLogo from '../images/Spotify_Logo_RGB_Green.png';

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <Image className="w-[100vh] mb-5" src={spotifyLogo} alt="Spotify Logo" title="Logo Spotify" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="bg-[#1ed760] text-black font-bold p-5 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#1fdf64]" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Iniciar sesión con {provider.name}
          </button>

        </div>
      ))}
    </div>
  )
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}