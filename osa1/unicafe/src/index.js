import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad}) => {

  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>
  }

  const avg = (good - bad) / (good + neutral + bad)
  const pos = (good / (good + neutral + bad) * 100) + '%'

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="average" value={avg} />
        <StatisticsLine text="positive" value={pos} />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button onClick={handleGood} text='good' />
        <Button onClick={handleNeutral} text='neutral' />
        <Button onClick={handleBad} text='bad' />
      </div>
      <h2>Statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
