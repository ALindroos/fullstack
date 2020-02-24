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
          id="username"            
          onChange={onUsernameChange}          
        />        
      </div>       
      <div>          
        password            
        <input            
          type="password"            
          value={password}            
          id="password"            
          onChange={onPasswordChange}          
        />        
      </div>        
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm