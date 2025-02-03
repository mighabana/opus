'use client'

import Image from "next/image";
import { fraunces } from '@/app/fonts';
import { useEffect, useState } from "react";

// function colorizeWords( word:string, highlighted: string, colors:Array<string> ) {
//   const prefix:string = word.replace(highlighted, '')
  
//   if (colors.length == 1) {
//     return (
//       <span>{prefix}<span className={`text-[${colors[0]}]`}>highlighted</span></span>
//     )
//   } else if (colors.length == 2) {

//   } else {
//     function renderRow() {

//     }

//     function renderRows = () => {
//       highlighted.split('').map((char, index) => renderRow())
//     }

//     const h = highlighted.split('').forEach((char, index) => {
//       return <span className={`text-[${colors[index]}]`}>{char}</span>
//     })
//     return (
//       <span>{prefix}<span>{h}</span></span>
//     )
//   }
// }

function Description({n} : {n:number}){
  const options = [{
    // name: 'data professional',
    // color: '#FF8400',
    // image1: '/analytics.png',
    // image2: '/database.png',
    // image3: '/code.png'
  // },{
    //   name: 'photographer',
    //   color: '#0084FF',
    //   image1: '/jpeg.png',
    //   image2: '/portrait.png',
    //   image3: '/cute-camera.png'
    //   name: 'music lover',
    //   color: '#2BFF00',
    //   image1: '/music.png',
    //   image2: '/romantic-music.png',
    //   image3: '/listen.png'
  // },{
    name: 'a data engineer',
    highlighted: 'data engineer',
    defaultColor: '#FFF',
    color: ['#1b8a00'],
    image1: '/pipe.png', // <a href="https://www.flaticon.com/free-icons/gas" title="gas icons">Gas icons created by AmethystDesign - Flaticon</a>
    image2: '/database.png', //<a href="https://www.flaticon.com/free-icon/database" title="database icons">Database icons created by Freepik - Flaticon</a>
    image3: '/chart.png', //<a href="https://www.flaticon.com/free-icons/business-and-finance" title="business and finance icons">Business and finance icons created by Freepik - Flaticon</a>
  },{
    name: 'that geeks out about automation',
    highlighted: 'automation',
    defaultColor: '#FFF',
    color: ['#ff6868','#ff9d68', '#ffd668','#9fff68', '#68ff96','#68fff8', '#68b3ff', '#6881ff', '#aa68ff', '#ff68ff'],
    image1: '/coding.png', //<a href="https://www.flaticon.com/free-icons/machine-learning" title="machine learning icons">Machine learning icons created by Smashicons - Flaticon</a>
    image2: '/robot.png', //<a href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created by smashingstocks - Flaticon</a>
    image3: '/software.png', //<a href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created by smashingstocks - Flaticon</a>
  },{
    name: 'appreciates beautiful configs',
    highlighted: 'beautiful configs',
    defaultColor: '#FFF',
    color: ['#68b3ff', '#3453d0'],
    image1: '/file.png', //<a href="https://www.flaticon.com/free-icons/configuration" title="configuration icons">Configuration icons created by iconixar - Flaticon</a>
    image2: '/settings.png', //<a href="https://www.flaticon.com/free-icons/configuration" title="configuration icons">Configuration icons created by Freepik - Flaticon</a>
    image3: '/process.png', //<a href="https://www.flaticon.com/free-icons/process" title="process icons">Process icons created by Freepik - Flaticon</a>
  },{
    name: 'loves well designed terminal setups',
    highlighted: 'terminal setups',
    defaultColor: '#FFF',
    color: ['#ecc48d'],
    image1: '/terminal.png', //<a href="https://www.flaticon.com/free-icons/terminal" title="terminal icons">Terminal icons created by Smashicons - Flaticon</a>
    image2: '/coding (1).png', //<a href="https://www.flaticon.com/free-icons/code" title="code icons">Code icons created by Roundicons Premium - Flaticon</a>
    image3: '/pos-terminal.png' //<a href="https://www.flaticon.com/free-icons/pos-terminal" title="pos terminal icons">Pos terminal icons created by smashingstocks - Flaticon</a>
  }, {
    name: 'and like everyone else... trying out ai~',
    highlighted: 'ai~',
    defaultColor: '#FFF',
    color: ['#850af1', '#20fc20', '#b2b2b2'],
    image1: '/ai.png', //<a href="https://www.flaticon.com/free-icons/artificial-intelligence" title="artificial intelligence icons">Artificial intelligence icons created by Freepik - Flaticon</a> 
    image2: '/ai (1).png', //<a href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created by Freepik - Flaticon</a>
    image3: '/technology.png', //<a href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created by SBTS2018 - Flaticon</a>
  }]

  return (
    <div className='flex flex-row pl-[40%] w-max min-h-15'>          
      <Image className="relative right-5 -rotate-[20deg]" src={options[n].image1} width={50} height={50} alt=""/>
      <h2><span className={`text-[${options[n].defaultColor}]`}>{options[n].name}</span></h2>
      <Image className="relative top-14 right-24" src={options[n].image2} width={50} height={50} alt=""/>
      <Image className="relative bottom-14 right-16 rotate-[25deg]" src={options[n].image3} width={50} height={50} alt=""/>
    </div>
  );
}

export default function Home() {
  let len = 4
  let [n, setN] = useState(0)
  let [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault()

      if (!loading && Math.abs(event.deltaY) < 6) {
        setLoading(true)
        console.log(event.deltaY)

        if ( event.deltaY > 0) {
          if (n + 1 > len) {
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
        <div className='pr-[55%] pb-4 w-screen'>
          <h1 className='pl-[55%] w-max'>Hi! I'm Miguel Habana &#x1F44B;...</h1>
        </div>
          <Description n={n}/>
      </div>
    </div>
  );
}
