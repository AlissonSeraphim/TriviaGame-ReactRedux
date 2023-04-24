import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithRouterAndRedux} from './renderWithRouterAndRedux';
import App from '../../App';

const INITIAL_STATE = {
    name: 'a',
    assertions: 3,
    score: 233,
    gravatarEmail: 'aaa@gmail.com'
  }

  describe('teste da página login', () => {
  it('verifica se renderiza todos os elementos', () => {


    renderWithRouterAndRedux(<App />, { initialEntries: ['/feedback'], initialState: INITIAL_STATE });

    const gravatarPic = screen.getByTestId('header-profile-picture');
    expect(gravatarPic).toBeInTheDocument();

    const profileName = screen.getByTestId('header-player-name');
    expect(profileName).toBeInTheDocument();

    const playerScore = screen.getByTestId('header-score');
        expect(playerScore).toBeInTheDocument();

    const feedbackMessage = screen.getByTestId('feedback-text');
        expect(feedbackMessage).toBeInTheDocument();

    const totalScore = screen.getByTestId('feedback-total-score');
        expect(totalScore).toBeInTheDocument();
        expect(typeof totalScore).toBe('object');

    const totalQuestion = screen.getByTestId('feedback-total-question');
        expect(totalQuestion).toBeInTheDocument();
        expect(typeof totalQuestion).toBe('object');    
    })

    it('Verifica se é redirecionada para o Login',()=>{
        renderWithRouterAndRedux(<App />, { initialEntries: ['/feedback'], initialState: INITIAL_STATE });
    
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();
        userEvent.click(btnPlayAgain)          
    const title = screen.getByRole('heading', { name: /trivia/i });
    expect(title).toBeInTheDocument();
    })

    it('Verifica se é redirecionada para o Ranking',()=>{
        renderWithRouterAndRedux(<App />, { initialEntries: ['/feedback'], initialState: INITIAL_STATE });
    
    const btnRanking = screen.getByTestId('btn-ranking')
    expect(btnRanking).toBeInTheDocument();
        userEvent.click(btnRanking)          
    const rankingTitle = screen.getByTestId('ranking-title');
    expect(rankingTitle).toBeInTheDocument();
    })
  })
