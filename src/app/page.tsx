'use client'

import Image from "next/image";
import { fraunces } from '@/app/fonts';
import { useEffect, useState } from "react";

function Description({n} : {n:number}){
  const options = [{
    name: 'data professional',
    color: '#FF8400',
    image1: '/analytics.png',
    image2: '/database.png',
    image3: '/code.png'
  },{
    name: 'photographer',
    color: '#0084FF',
    image1: '/jpeg.png',
    image2: '/portrait.png',
    image3: '/cute-camera.png'
  },{
    name: 'music lover',
    color: '#2BFF00',
    image1: '/music.png',
    image2: '/romantic-music.png',
    image3: '/listen.png'
  }]

  return (
    <div className='flex flex-row pl-[75%] w-max'>          
      <Image className="relative right-5 -rotate-[20deg]" src={options[n].image1} width={50} height={50} alt=""/>
      <h2>a <span className={`text-[${options[n].color}]`}>{options[n].name}</span>.</h2>
      <Image className="relative top-14 right-24" src={options[n].image2} width={50} height={50} alt=""/>
      <Image className="relative bottom-14 right-16 rotate-[25deg]" src={options[n].image3} width={50} height={50} alt=""/>
    </div>
  );
}

export default function Home() {
  let [n, setN] = useState(0)
  let [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault()

      if (!loading && Math.abs(event.deltaY) < 6) {
        setLoading(true)
        console.log(event.deltaY)

        if ( event.deltaY > 0) {
          if (n + 1 > 2) {
            setN(0)
          } else {
            setN(n + 1)
          }
        } else if ( event.deltaY < 0) {
          if (n - 1 < 0) {
            setN(2)
          } else {
            setN(n-1)
          }
        }
        
        window.setTimeout(() => {setLoading(false)} ,1500)
      }

    };

    // Add the event listener when the component mounts
    window.addEventListener('wheel', handleWheel, {passive : false});

    // Cleanup the event listener when the component unmounts (if it happens before the first event)
    return () => {
      window.removeEventListener('wheel', handleWheel,);
    };
  }, [n, loading]);

  return (
    <div className="flex flex-col items-center justify-center justify-items-center min-h-screen text-2xl">
      <div className={`${fraunces.className} flex flex-col justify-center items-center min-w-2/3`}>
        <div className='pr-[55%] pb-4 w-max'>
          <h1>Hi! I'm Miguel Habana...</h1>
        </div>
          <Description n={n}/>
      </div>
    </div>
  );
}
