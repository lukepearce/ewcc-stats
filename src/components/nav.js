import * as React from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { Link } from 'gatsby'

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.state = { loggedIn: false };
  }

  handleLogInClick() {
    netlifyIdentity.open();
  }

  handleLogOutClick() {
    netlifyIdentity.logout();
  }

  afterLogIn(user) {
    netlifyIdentity.close();
    console.log(user);
    //window.location.replace(`https://www.strava.com/oauth/mobile/authorize?client_id=31292&response_type=code&redirect_uri=http://localhost:8000/auth&approval_prompt=force&scope=profile:read_all,activity:read_all`);
    this.setState({ loggedIn: true });
  }

  componentDidMount() {
    netlifyIdentity.init();
    window.netlifyIdentity = netlifyIdentity;
    netlifyIdentity.on("login", user => this.afterLogIn(user));
    netlifyIdentity.on("logout", () => this.setState({ loggedIn: false }));
  }

  render() {
    const user = netlifyIdentity.currentUser();

    let link;

    if (!user) {
        link = <a
          href="#"
          onClick={ this.handleLogInClick }
        >
          Sign up | Log in
        </a>;
    }
    else {
      link = <a
        href="#"
        onClick={ this.handleLogOutClick }
      >
        Log out
      </a>;
    }

    return (
      <div>
        <ul style={{
          padding: `0`,
          margin: `0`,
          listStyle: `none`,
        }}>
          <li style={{
            paddingRight: `1em`,
            display: `inline-block`
          }}>
            <Link
              to="/strava"
              activeStyle={{ textDecoration: "underline" }}
            >
              Profile
            </Link>
          </li>
          <li style={{
            paddingRight: `1em`,
            display: `inline-block`
          }}>
            <Link
              to="/roadmap"
              activeStyle={{ textDecoration: "underline" }}
            >
              Roadmap
            </Link>
          </li>
          <li style={{
            paddingRight: `1em`,
            display: `inline-block`
          }}>
            <Link
              to="/users"
              activeStyle={{ textDecoration: "underline" }}
            >
              Club Members
            </Link>
          </li>
          <li style={{
            float: `right`,
            display: `inline-block`
          }}>
            {link}
          </li>
        </ul>

      </div>
    )
  }
}

export default Nav;