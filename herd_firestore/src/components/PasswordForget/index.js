import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </div>
)

const PasswordForgetLink = () => (
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  );

function PasswordForgetFormBase(props) {

    const [email,setEmail] = useState('');
    const [error, setError] = useState(null);

    const isInvalid = email === '';

    const onSubmit = (e) => {
        props.firebase
            .doPasswordReset(email)
            .then(() => {
                setEmail(null)
            })
            .catch(err => {
                setError(err)
            });

        e.preventDefault();
    }

    const onChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value);
        } else {
            setError(e.target.value);
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <input
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
            Reset My Password
            </button>

            {error && <p>{error.message}</p>}
        </form>
    )
}

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };