import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
  const {request} = useHttp()
  const [link, setLink] = useState('')
  const pressHandler = async event => {
    if(event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link})
        console.log('Link data:', data)
      }
      catch(e){}
    }
  }

  useEffect(() => {
    window.M.updateTextFields()
  })

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <input
          placeholder="Insert link"
          id="link"
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
          onKeyPress={pressHandler}
        />
        <label htmlFor="link">Insert link</label>
      </div>
    </div>
  )
}