import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';
import base from '../store/rebase';
import { withRouter } from 'react-router-dom';
import AppBar from './AppBar';
import Content from './Content';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        const user = base.getCurrentUser();
        if(user) this.props.history.push('/');
    }

    loginWithGoogle() {
        base.authWithOAuthPopup('google', (error, user) => {
            if(error) {
                console.log(error)
            }
            this.props.history.push('/');

        });
    }

    render() {
        return (<div>
                  <AppBar title="ZAP"/>
                    <Content>
                        <Card style={{
                            'maxWidth': '800px',
                            'margin': '30px auto',
                            'padding': '50px'
                            }}>
                        <CardText style={{
                            'textAlign': 'center'
                        }}>Please login</CardText>
                        <RaisedButton style={{
                            display: 'block',
                            }} onClick={this.loginWithGoogle} label="Login with Google"
                        />
                        </Card>
                    </Content>
                </div>);
    }
}

export default withRouter(Login);