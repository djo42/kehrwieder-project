import styled from 'styled-components'

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.5em;
  background: white;
  box-shadow: 0px 5px 5px #27272780;
  align-items: center;
  align-text: right;
  justify-items: middle;
  z-index: 100;
`

export const Main = styled.main`
  position: relative;
  width: 100%;
  z-index: 90;
`

export const Formcontainer = styled.div`
  padding: 15px 0;
`

export const Headlinewrapper = styled.div`
  padding: 15px;
`


//Form Components

export const InputcontainerRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-items: middle;
    margin: 10px;
    padding: 5px;
    width: 100%;
`

export const InputcontainerColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-items: middle;
    margin: 10px;
    padding: 5px;
    width: auto;
`

export const Input = styled.input`
  display: flex;
  width: auto;
  align-items: stretch;
  height: 30px;
  padding: 0;
  font-size: 1em;
  line-height: 150%;
  color: grey;
  margin: 0;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  background: transparent;
`

export const DatetimeInput = styled.input`
  display: flex;
  width: auto;
  align-items: stretch;
  height: 30px;
  padding: 0;
  font-size: 1em;
  line-height: 150%;
  color: grey;
  margin: 0;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  background: transparent;
`

export const BranchInput = styled.input`
  display: flex;
  width: auto;
  align-items: stretch;
  padding: 0;
  margin: 0;
  font-size: 1em;
  color: grey;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  line-height: 150%;
  background: transparent;
`

export const Label = styled.label`
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: grey;
    pointer-events: none;
    transition: .5s;
    width: auto;
`

//Offer Display

export const Card = styled.div`
    display: flex;
    flex-direction:column;
    align-items: left;
    justify-content: left;
    width: auto;
    padding: 0;
    margin: 25px;
    background: white;  
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
    color: black;
`

export const Cardcontainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items: left;
    justify-content: left;
    width: 100%;
    padding: 0 20px;
    margin: 0;
    background: transparent;  
    box-sizing: border-box;
    border: none;
`

export const Button = styled.button`
  width: 25%;
  margin: 0 auto;
  border: none;
  padding: 5px;
  margin: 0;
  background: forestgreen;
  color: white;
  font-family: Roboto;
  font-size: 1.2em;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  border-radius: 10px;
`

export const Carpic = styled.img`
    top: 0;
    left:0;
    width: 100%;
    height: auto;
    border-radius: 10px 10px 0 0;
    margin: 0;
    padding:0;
    z-index: 99;
`

export const Imgcontainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10; 0 0 0;
  margin: 0;
  padding: 0px;
  border-radius: 10px 10px 0 0;  
`

export const Pricedisplay = styled.div`
  text-align: left;
  color: black;
  font-style: normal;
  font-family: Roboto;
  font-size: 1.2em;
  height: 50px;
  margin-top: 12px;
`

export const Taglist = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  list-style: none;
  list-style-position: inside;
  padding: 0;
  margin: 10 0;
`

export const Tag = styled.li`
  margin: 5px 0 0 5px;
  padding: 5px;
  color: white;
  background: #ff5f00;
  font-size: 0.8em;
  font-weight: bold;
  vertical-align: middle;
`

//Headline

export const Headline = styled.h2`
  display: inline-block;
  line-height: 150%;
  text-align: left;
  color: white;
  font-size: 1.2em;
  padding: 0;
  margin: 0;
`

export const OfferCardHeadline = styled.h2`
  position: absolute;
    top: 20px;
    left:20px;
    line-height: 160%;
    text-align: left;
    color: white;
    font-size: 1em;
    padding: 0;
    margin:0;
    margin-right: 20px;
    z-index: 100;
`

export const Textwrapper = styled.span`
    color: white;
    background: black;
    text-align: center;
    vertical-align:middle;
    line-height: 1.5rem;
    font-size: 1.25rem;
    padding: 5px 10px;
    box-decoration-break: clone;
`

//Functional Elements

export const Toggler = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  margin: 1px;
  border: 1px solid grey;
  color: grey;
  text-align: left;
  width: auto;
  `

export const Filterbar = styled.div`
    display: flex;
    padding: 10px;
    margin: 10px;
    max-height: 100px;
`

export const Filtercontainer = styled.div`
    align-items: center;
    font-size: 0.75em;
    padding-right: 1.5625rem;
    text-align: center;
    height: auto;
    width: auto;
    padding-bottom: 0;
    vertical-align: middle;
    margin: 10px;
`

export const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  padding: 20px;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: center;
  }              */
  td,
  th {
    border: none;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: 5px 5px;
    font-size: 1em;
    margin: 0;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`

/*   transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  }

  &:hover,
  &:focus {
  background: #0053ba;
  }

  &:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
  }

  &:active {
  transform: scale(0.99); */
