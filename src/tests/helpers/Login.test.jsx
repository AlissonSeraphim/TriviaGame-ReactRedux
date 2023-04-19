import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../../App';

const nameTest = 'Julio Saturnino';
const emailTest = 'email@test.com';

describe('teste da página login', () => {
  it('verifica se renderiza todos os elementos', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', { name: /trivia/i });
    expect(title).toBeInTheDocument();

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();

    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    const btnPlay = screen.getByRole('button', { name: /Play/i });
    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).toBeDisabled();

    const btnConfig = screen.getByRole('button', { name: /Settings/i });
    expect(btnConfig).toBeInTheDocument();
  });

  it('verifica se o botão fica habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: /Play/i });

    userEvent.type(inputName, nameTest);
    userEvent.type(inputEmail, emailTest);

    expect(btnPlay).toBeEnabled();
  });

  it('verifica se a função onSubmit é chamada',async () => {
    global.fetch = jest.fn();
    const { history } = renderWithRouterAndRedux(<App/>)

    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btnPlay = screen.getByTestId('btn-play')

    userEvent.type(inputName, nameTest);
    userEvent.type(inputEmail, emailTest);
    act(() => { userEvent.click( btnPlay)});
    const { location: { pathname } } = history
    console.log(pathname);
    expect(pathname).toBe("/game")
    })
    
    it('Verifica se é redirecionada para configurações',()=>{
      renderWithRouterAndRedux(<App/>)

      const btnSettings = screen.getByTestId('btn-settings')

      userEvent.click(btnSettings)
      
      const title = screen.getByTestId('settings-title')
      expect(title).toBeInTheDocument()
    })
  })
