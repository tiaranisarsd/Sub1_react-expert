/**
 * - RegisterInput component test
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import RegisterInput from './RegisterInput';

describe('RegisterInput component test', () => {
  const mockRegister = vi.fn(); 

  const renderComponent = () => {
    render(
      <ChakraProvider>
        <RegisterInput register={mockRegister} />
      </ChakraProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  it('should handle name typing correctly', () => {
    renderComponent();

    const nameInput = screen.getByPlaceholderText('Masukkan nama Anda');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    expect(nameInput.value).toBe('John Doe');
  });

  it('should handle email typing correctly', () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText('johndoe@example.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText('********');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  it('should call register function when register button is clicked', async () => {
    renderComponent();

    const nameInput = screen.getByPlaceholderText('Masukkan nama Anda');
    const emailInput = screen.getByPlaceholderText('johndoe@example.com');
    const passwordInput = screen.getByPlaceholderText('********');
    const registerButton = screen.getByText('Daftar');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
