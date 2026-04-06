import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card1 from './components/Card'

function App() {

  return (<>
    <h1 className="text-red-500 text-xl font-bold underline" >Tailwind</h1>
    <Card1 name="Ansul Card" description="This is a card" />
    <Card1 name="Card 2" description="ram ram bhai sariyane" color="text-red-500" />
    <Card1 description="wjhfdjinfajdn" color="text-green-500" />
  </>
  )
}

export default App
