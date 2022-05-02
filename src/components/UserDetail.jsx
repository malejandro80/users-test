/** @format */

import React from 'react'
import { get } from '../services/httpConect'

export const UserDetail = ({ userID }) => {
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    if (userID !== null) {
      getUser()
    }
  }, [userID])

  const getUser = async () => {
    const { data } = get(`user/${userID}`)
    setUser(data)
  }

  return (
    <div className='mt-4'>
      {user !== null && (
        <>
          <div class='card'>
            <h5 class='card-header'>User</h5>
            <div class='card-body'>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p class='card-text'>{`userID ${user.userID}`}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
