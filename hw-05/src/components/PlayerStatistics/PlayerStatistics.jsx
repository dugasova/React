import React, { useContext } from 'react'

export default function PlayerStatistics({ item }) {

  return (
    <div>
      <h3>👥Followers: {item.data.followers}</h3>
      <h3>🌟Repo Stars: {item.additionalData.reposStars}</h3>
      <h3>🏁Total Score: {item.additionalData.totalScore}</h3></div>
  )
}
