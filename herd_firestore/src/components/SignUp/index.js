import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
)

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>        
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

withRouter(withFirebase(SignUpFormBase));

function SignUpFormBase(props) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(null);

    const isInvalidPwd =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    const isEmptyUsr = username === '';

    const isEmptyEmail = email === '';

    const isInvalid = isInvalidPwd || isEmptyEmail || isEmptyUsr;
    
    const onBlur = (e) => {
        switch(e.target.name){
            case 'username':
                isEmptyUsr ? setError({message: 'Username required'}):setError(null);
                break;
            case 'passwordTwo':
                isInvalidPwd ? setError({message: 'Passwords must match'}):setError(null);
                break;
            default:
                isEmptyEmail ? setError({message: 'Email required'}):setError(null);
                break;
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
                    props.history.push(ROUTES.HOME);
                })
                .catch(err => {
                    setError(err);
                })
    }

    const onChange = (e) => {
        switch(e.target.name){
            case 'username':
                setUsername(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
                break;
            case 'passwordOne':
                setPasswordOne(e.target.value)
                break;
            case 'passwordTwo':
                setPasswordTwo(e.target.value)
                break;
            default:
                setError(e.target.value)
                break;
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <input
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            onBlur={(e) => onBlur(e)}
            type="text"
            placeholder="Full Name"
            />
            <input
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            onBlur={(e) => onBlur(e)}
            type="text"
            placeholder="Email Address"
            />
            <input
            name="passwordOne"
            value={passwordOne}
            onChange={(e) => onChange(e)}
            onBlur={(e) => onBlur(e)}
            type="password"
            placeholder="Password"
            />
            <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={(e) => onChange(e)}
            onBlur={(e) => onBlur(e)}
            type="password"
            placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">Sign Up</button>

            {error && <p>{error.message}</p>}
        </form>
    )
}

export default SignUpPage;

export { SignUpForm, SignUpLink };