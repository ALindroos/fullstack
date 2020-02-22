import React from 'react'

const LoginForm = ({ 
  onSubmit, onUsernameChange, onPasswordChange,
  username, password }) => {

  return(
    <form onSubmit={onSubmit}>        
      <div>          
        username            
        <input            
          type="text"            
          value={username}            
          name="Username"            
          onChange={onUsernameChange}          
        />        
      </div>       
      <div>          
        password            
        <input            
          type="password"            
          value={password}            
          name="Password"            
          onChange={onPasswordChange}          
        />        
      </div>        
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm