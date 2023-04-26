import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Header.css';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <div>
        <img
          className="profilePicture"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="profile-avatar"
        />
        <span
          data-testid="header-player-name"
          className="username"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
          className="score"
        >
          { score }
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
