import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../../App';

const nameTest = 'Julio Saturnino';
const emailTest = 'email@test.com';

describe('teste da página login', () => {
  it('verifica se renderiza todos os elementos', () => {
    renderWithRouterAndRedux(<App />);

    const gravatarPic = screen.getByTestId('header-profile-picture');
    expect(gravatarPic).toBeInTheDocument();

    const profileName = screen.getByTestId('profile-player-name');
    expect(profileName).toBeInTheDocument();

    const playerScore = screen.getByTestId('header-score');
        expect(playerScore).toBeInTheDocument();

    const feedbackMessage = screen.getByTestId('feedback-message');
        expect(feedbackMessage).toBeInTheDocument();

    const totalScore = screen.getByTestId('feedback-total-score');
        expect(totalScore).toBeInTheDocument();
        expect(typeof totalScore).toBe('number');

    const totalQuestion = screen.getByTestId('feedback-total-question');
        expect(totalQuestion).toBeInTheDocument();
        expect(typeof totalQuestion).toBe('number');    
    })

    it('Verifica se é redirecionada para o Login',()=>{
        renderWithRouterAndRedux(<App/>)
    
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();
        userEvent.click(btnPlayAgain)          
    const title = screen.getByRole('heading', { name: /trivia/i });
    expect(title).toBeInTheDocument();
    })

    it('Verifica se é redirecionada para o Ranking',()=>{
        renderWithRouterAndRedux(<App/>)
    
    const btnRanking = screen.getByTestId('btn-ranking')
    expect(btnRanking).toBeInTheDocument();
        userEvent.click(btnRanking)          
    const rankingTitle = screen.getByTestId('ranking-title');
    expect(rankingTitle).toBeInTheDocument();
    })
  })
