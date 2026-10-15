import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

test('renders the header navigation with the hero section visible', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // i18n falls back to German; the header "start" nav link (rendered both
  // in the desktop nav and the mobile sidebar) and the hero name heading
  // are stable, always-visible pieces of text independent of theme
  // transitions or scroll-driven animations. The loading overlay also
  // renders "lukas." as part of "lukas.schaffrath", so target the hero's
  // own heading by its exact accessible name.
  expect((await screen.findAllByText('start')).length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: 'lukas.' })).toBeInTheDocument();
});
