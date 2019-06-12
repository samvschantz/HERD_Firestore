import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey              : process.env.HERD_API_KEY,
    authDomain          : process.env.HERD_AUTH_DOMAIN,
    databaseURL         : process.env.HERD_DATABASE_URL,
    projectId           : process.env.HERD_PROJECT_ID,
    storageBucket       : process.env.HERD_STORAGE_BUCKET,
    messagingSenderId   : process.env.HERD_MESSAGING_SENDER_ID,
    appId               : process.env.HERD_APP_ID
}

class Firebase {
    constructor() {
        app.initializeApp(config);
    
        this.auth = app.auth();

    }

    //Auth API

    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);
    
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => 
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;