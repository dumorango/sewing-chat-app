import Rebase from 're-base';
import config from './config';


let base = Rebase.createClass(config, 'App');
base.getCurrentUser = () => {
    const user = base.initializedApp.auth().currentUser;
    if(!user) return user;
    const { uid, photoURL = '', displayName, email } = user;
    return { uid, photoURL, displayName, email };
};

base.signOut = () => {
    base.initializedApp.auth().signOut()
};

export default base;
