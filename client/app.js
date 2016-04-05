import React from 'react';


// define and export our Layout component
export const Layout = ({content}) => (
    <div>
        <h1>My App</h1>
        <hr />
        <div>{content}</div>
    </div>
);

export class Welcome extends React.Component {
  constructor(){
    super();
    this.state = {
        fbdata: null
      };
  }

  onLogin(){
    let self = this;
    let options = {
      requestPermissions: ['email', 'public_profile', 'user_friends', 'user_likes' ]
    }

    Meteor.loginWithFacebook(options,
      function(err){
        if (err){
          throw new Meteor.Error('Facebook login failed: ' + err);
        } else {
          console.log('Facebook login ok');
          let user = Meteor.user()
          let fb = {
            id: user.services.facebook.id,
            access_token: user.services.facebook.accessToken,
          }
          if (user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')  ) {

            // already provided in Chrome / Firefox use a polyfill otherwise
            fetch(`https://graph.facebook.com/v2.4/${fb.id}/?access_token=${fb.access_token}&fields=first_name,last_name,email,likes,permissions`)
              .then((response) => response.json() )
              .then((data) => self.setState({fbdata: data}))

          }

        }
      }
    );
  }

  render(){
    return (
      <div>
        {this.state.fbdata ? (
          <div>
            access_token valid until: { new Date(Meteor.user().services.facebook.expiresAt).toString() }
            <pre>
            {JSON.stringify(this.state.fbdata, null, 2)}
            </pre>
          </div>
        ): (
          <button onClick={() => { this.onLogin() }}>Login</button>
        ) }
      </div>
    )
  }
}
