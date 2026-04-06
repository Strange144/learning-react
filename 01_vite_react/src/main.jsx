import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
// function Myfunction() {
//   return (
//     <h1>myfunction</h1>
//   )
// }

const custelement = {
  type: 'a',
  props: {
    href: 'https://google.com',
    target: '_blank'
  },
  children: 'click me'
}

// const trysec = (
//   <a href="www.google.com">click here for google</a>
// );
const aisehe = "ider click karo"
const customelement = React.createElement(
  "a",
  { href: "www.google.com", target: "_blank" },
  aisehe
)

createRoot(document.getElementById('root')).render(
  // <Myfunction />
  // custelement
  // trysec
  customelement
)
