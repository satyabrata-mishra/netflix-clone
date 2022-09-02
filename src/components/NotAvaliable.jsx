import React from 'react'
import styled from 'styled-components'

export default function NotAvaliable() {
  return (
    <div>
        <h1 className='not-avaliable flex j-center a-center'>No Movies Avaliable for selected genres</h1>
    </div>
  )
}
const Conatiner = styled.div`
  .not-avaliable{
    text-align: center;
    color: white;
    margin-top: 4rem;
  }  
`;