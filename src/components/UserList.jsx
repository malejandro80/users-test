/** @format */

import React from 'react'
import { del, get } from '../services/httpConect'
import { UserDetail } from './UserDetail'

export const UserList = () => {
  const [users, setUsers] = React.useState([
    {
      userID: 'US12345678901234567890123456789012',
      firstName: 'Jeff',
      lastName: 'Worford',
      isActive: 1,
      createdDate: '2022-01-10T05:00:00.000Z',
      roleName: 'Admin'
    }
  ])
  const [userID, setuserID] = React.useState(null)
  React.useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const { data } = await get('user')
    setUsers(data)
  }

  const deleteUser = async userId => {
    const { data } = await del(`user/${userId}`)
    if (data.code === 200) {
      const newUsers = users.filter(user => user.userID !== userId)
      setUsers(newUsers)
    }
  }

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>FirstName</th>
            <th scope='col'>LastName</th>
            <th scope='col'>delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr
                key={user.userID}
                onClick={() => {
                  setuserID(user.userID)
                }}
              >
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      deleteUser(user.userID)
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <UserDetail userID={userID} />
    </>
  )
}
