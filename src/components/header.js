import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Nav from '../components/nav'

const Header = ({ siteTitle }) => (
  <>
    <h1 style={{ margin: 0 }}>
      <Link
        to="/"
      >
        {siteTitle}
      </Link>
    </h1>
    <Nav />
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
