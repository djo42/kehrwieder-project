import React, { useState } from 'react'
import { Toggler, Cardcontainer, Taglist, Tag } from './Components.js'
import '../App.css'

export default function Inclusionslist({ offer }) {
  const [visibility, setVisibility] = useState(false)

  const handleToggle = () => {
    setVisibility(!visibility)
  }

  return (
    <Toggler onClick={handleToggle}>
      ▼ Click here to see extras{' '}
      {visibility && (
        <Taglist>
          {offer.Extras.Included.map((item, index) => {
            return (
              <Tag key={index} {...item}>
                {item.Name}
              </Tag>
            )
          })}
          {offer.Coverages.Included.map((item, index) => {
            return (
              <Tag key={index} {...item}>
                {item.Name.replace('Collision Damage Waiver', 'CDW') +
                  ' (Excess: ' +
                  Math.floor(item.Excess.Amount).toLocaleString('de-DE') +
                  ' ' +
                  item.Excess.Currency +
                  ')'}
              </Tag>
            )
          })}
        </Taglist>
      )}
    </Toggler>
  )
}
