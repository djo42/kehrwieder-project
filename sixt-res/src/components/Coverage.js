import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import '../App.css'

export default function Coverage(item, index) {
  const [selected, setSelected] = useState()

  useEffect(() => {
    selected ?? setSelected(false)
  }, [])

  function select(event) {
    event.preventDefault()
    setSelected(!selected)

    var obj = {}
    obj['Selected'] = !selected
    obj['Code'] = item.Code

    item.callback(obj)
  }

  return (
    <tr
      onClick={select}
      class={selected ? 'table-success' : 'table-warning'}
      key={index}
      {...item}
    >
      <td class="tbl-cell">
        {item.Name.replace('Collision Damage Waiver', 'CDW')}
        <br />
        {'(Excess: ' + Math.floor(item.Excess.Amount).toLocaleString('de-DE')}
      </td>
      <td class="txt-align-right tbl-cell">
        {selected ? item.Total.DueAmount : <span>+</span>}
      </td>
      <td class="txt-align-left tbl-cell">
        {selected ? item.Total.Currency : ''}
      </td>
    </tr>
  )
}
