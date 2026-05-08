import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders key sections', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /PhysioConnect/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Book a Session/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Symptom Checker/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Dashboard/i })).toBeInTheDocument();
  });
});
