/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'back1':"url('./assets/svgs/bghome.png')"
      },
      fontFamily:{
        "SpaceMono":["Space Mono"]
      },
      keyframes: {
        
        blink: {
          "50%": {
            backgroundColor: "transparent"
          },
          "100%": {
            backgroundColor: "white"
          }  
        },
        bounce:{
          "0%":{
            transform:'translateY(-25%)'
          },
          
          "100%":{
            transform:'translateY(30%)'
          },
        },
        rotateOrbit:{
          "0% , 100%":{
            transform:'rotate(10deg) translateY(0%)',
          },
          "50%":{
            transform:'rotate(360deg) translateY(30%)',
          }
        },


      },
      animation: {
        blink: "blink 1s infinite alternate",
        drone: "bounce 15s infinite alternate",
        orbit: "rotateOrbit 500s infinite alternate",
        spinOrbit: "rotateOrbit 300s infinite alternate"
      }
    },
  },
  plugins: [],
}