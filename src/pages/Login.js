import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionLogin } from '../actions';
import './Login.css';
import logo from '../images/logo.svg';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  validateEmail = () => {
    const { email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  validatePassword = () => {
    const { password } = this.state;
    const MIN_LENGTH_PASSWORD = 6;
    return password.length < MIN_LENGTH_PASSWORD;
  };

  handleSubmit = () => {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const { dispatch } = this.props;

    return (
      <div id="container-login">
        <img id="wallet-img" src={ logo } alt="carteira" />
        <div>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              name="email"
              value={ email }
              type="text"
              onChange={ this.handleChange }
              id="input-email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              value={ password }
              name="password"
              type="password"
              onChange={ this.handleChange }
              className="form-control"
              placeholder="Senha"
              aria-label="Senha"
              aria-describedby="basic-addon1"
            />
          </label>
        </div>
        <button
          disabled={ !this.validateEmail() || this.validatePassword() }
          type="button"
          className="btn btn-success"
          onClick={ () => {
            dispatch(actionLogin(email, password));
            this.handleSubmit();
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  dispatch: PropTypes.object.isRequired,
}.isRequired;

export default connect()(Login);
