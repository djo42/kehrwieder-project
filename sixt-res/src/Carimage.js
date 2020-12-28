import React from 'react'
import './App.css'
import styled from 'styled-components'

export default function Carimage(url, examples) {
  return (
    <>
      <div>
        <img src={url} alt={examples} />
        <Headline>{examples}</Headline>
      </div>
    </>
  )
}
const Headline = styled.h3`
    position: absolute; 
    top: 200px; 
    left: 0; 
    width: 100%; 
`
