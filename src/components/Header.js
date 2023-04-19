import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ gravatarEmail }
          alt="profile-avatar"
        />
        <span data-testid="header-player-name">
          { name }
        </span>
        <span data-testid="header-score">
          { score }
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
