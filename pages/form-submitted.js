import Head from 'next/head';
import { Layout } from "../components/layout";
import Image from 'next/image'

export default function FormSubmitted() {
   return (
    <Layout className="overflow-x-hidden">
      <Head>
        <meta name="robots" content="noindex"/>
        <title>Formulier verzonden!</title>
      </Head>
      <span className='text-2xl relative mt-[40px] w-1/2 left-1/4'>Formulier verzonden!</span>
      <span className='text-lg relative left-1/4 w-1/2 mb-[20px]'>Je boodschap wordt overgedragen...</span>
      <img src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXZoMG5zMmg5cTJub3c3a3FiOXdvbmQxa2hhMnB1cnMxeDRqNjYxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fwoW9JT3Us4DsF4ArF/giphy.gif' className='mb-[10px] rounded-md relative left-1/4 h-auto w-1/2'></img>
      <button  className={`mb-[40px] py-[5px] relative left-1/4 rounded-[5px] border-basiskleur bg-liturgischekleur border-[2px] w-1/2`}><a className="no-underline" href='/'>Ga terug!</a></button>
    </Layout>
  );
}