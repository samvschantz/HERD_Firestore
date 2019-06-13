import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <SignUpLink />
    </div>
);

function SignInFormBase(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const isEmptyPwd = password === '';

    const isEmptyEmail = email === '';

    const isInvalid = isEmptyEmail || isEmptyPwd;

    const onBlur = (e) => {
        switch(e.target.name){
            case 'username':
                isEmptyPwd ? setError({message: 'Password required'}):setError(null);
                break;
            default:
                isEmptyEmail ? setError({message: 'Email required'}):setError(null);
                break;
        }
    }
    
    const onSubmit = (e) => {
        props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setError(error);
            })
        e.preventDefault();
    }
    
    const onChange = (e) => {
        switch(e.target.name){
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                setError(e.target.value);
                break;
        }
    }

    return (
        <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur(e)}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur(e)}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
}

const SignInForm = compose(
    withRouter,
    withFirebase,
  )(SignInFormBase);
  
  export default SignInPage;
  
  export { SignInForm };