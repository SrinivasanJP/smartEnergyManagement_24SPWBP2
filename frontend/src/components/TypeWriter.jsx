import React ,{useEffect, useState, useRef} from 'react'

function TypeWriter({userName}) {

  
    const [currentWord, setCurrentWord] = useState("");
 
    
    useEffect(()=>{
        let j = 0
        let isDeleting = false
        const words = `Welcome ${userName}`
          let i = Math.floor(Math.random()*words.length);
        let selectedWord = words[i];
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        const type= async ()=>{
            selectedWord = words
            if(isDeleting){
                setCurrentWord(selectedWord.substring(0,j-1))
                j=j-1
                if(j==0){
                    isDeleting=false
                    i=Math.floor(Math.random()*words.length)
                    await sleep(10000)
                }
            }else{
                setCurrentWord(selectedWord.substring(0,j+1))
                j=j+1
                if(j==selectedWord.length){
                    isDeleting=true
                    await sleep(10000)
                }
            }
            setTimeout(type, 100)
        }
        type()

    },[userName])
   
    
      return (
        <div>
            <h1 className=' md:text-3xl lg:text-5xl w-[80%] text-md font-bold inline-block font-SpaceMono lg:leading-loose'>{">> "+currentWord}<span className='inline-block ml-2 animate-blink md:h-8 h-5 w-[2px] '></span></h1>
        
        </div>
      );
}

export default TypeWriter