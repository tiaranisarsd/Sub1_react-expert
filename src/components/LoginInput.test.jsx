/**
 * - LoginInput component test
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom'; 
import LoginInput from './LoginInput'; 

describe('LoginInput component test', () => {
  const mockLogin = vi.fn(); 

  const renderComponent = () => {
    render(
      <ChakraProvider>
        <MemoryRouter> 
          <LoginInput login={mockLogin} />
        </MemoryRouter>
      </ChakraProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  it('should handle email typing correctly', () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText('johndoe@gmail.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  it('should call login function when login button is clicked', async () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText('johndoe@gmail.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const loginButton = screen.getByText('Masuk');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
