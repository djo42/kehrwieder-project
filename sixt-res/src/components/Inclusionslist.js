import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import '../App.css'
import getSixt from '../services.js'
import { Toggler } from './Components.js'
import Coverage from './Coverage.js'

export default function Inclusionslist({ offer }) {
  const [visibility, setVisibility] = useState(false)
  const [resdetails, setResdetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState()
  var extras = []

  useEffect(() => {
    setLoaded(false)
  }, [])

  async function getDetails() {
    console.log('Loaded 1: ' + loaded)
    console.log(visibility)
    setLoading(true)
    if (visibility === false && resdetails.length === 0) {
      const result = await getSixt(
        'availabilitydetails',
        '?avrw=' + offer.AvailabilityRow
      )
        .then((result) => {
          setResdetails(result.data)
          setLoaded(true)
          setVisibility(!visibility)
        })
        .catch((err) => console.log(err))
    }

    setVisibility(!visibility)
    setLoading(false)
  }

  const incrementalSales = (obj) => {
    console.log(obj)
    var arr = extras
    var filtered = []

    if (arr.length > 0) {
      filtered = arr.filter((e) => {
        return !e.Code.includes(obj.Code)
      })
    }

    obj.Selected
      ? filtered.push(obj) && (extras = filtered)
      : (extras = filtered)

    console.log(extras)
  }

  return (
    <>
      <Toggler>
        {loading ? (
          <div class="spinner spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <div class="hdl-tbl" onClick={getDetails}>
            {visibility ? '▲ Hide details ' : '▼ Show details '}
          </div>
        )}

        {loaded && (
          <table class={visibility ? 'table' : 'hidden table'}>
            <th class="hdl-tbl" colspan="3">
              Standard
            </th>

            {resdetails.Result.Extras.Must.map((item, index) => {
              return (
                <tr class="table-success" key={index} {...item}>
                  <td class="tbl-cell">{item.Name}</td>
                  <td class="txt-align-right tbl-cell">
                    {item.Total.DueAmount}
                  </td>
                  <td class="txt-align-left tbl-cell">{item.Total.Currency}</td>
                </tr>
              )
            })}
            <th class="hdl-tbl" colspan="3">
              Included Extras
            </th>
            {resdetails.Result.Extras.Included.map((item, index) => {
              return (
                <tr class="table-success" key={index} {...item}>
                  <td class="tbl-cell">{item.Name}</td>
                  <td class="txt-align-right tbl-cell" colspan="2">
                    included
                  </td>
                </tr>
              )
            })}
            <th class="hdl-tbl" colspan="3">
              Coverages
            </th>
            {resdetails.Result.Coverages.Included.map((item, index) => {
              return (
                <tr class="table-success" key={index} {...item}>
                  <td class="tbl-cell">
                    {`${item.Name.replace('Collision Damage Waiver', 'CDW')}`}
                    <br />
                    {`(Excess: ${Math.floor(item.Excess.Amount).toLocaleString(
                      'de-DE'
                    )})`}
                  </td>
                  <td class="txt-align-right tbl-cell" colspan="2">
                    included
                  </td>
                </tr>
              )
            })}
            {resdetails.Result.Coverages.Optional.map((item, index) => {
              return (
                <Coverage key={index} {...item} callback={incrementalSales} />
              )
            })}
          </table>
        )}
      </Toggler>
    </>
  )
}
