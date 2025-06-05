import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import Productos from '../components/Productos';

// Mock de localStorage
beforeEach(() => {
  Storage.prototype.setItem = vi.fn();
  Storage.prototype.getItem = vi.fn(() => null);
});

describe('Productos', () => {
  const mockProductos = [
    {
      id: 1,
      nombre: 'Zapatilla A',
      precio: 100,
      descripcion: 'Zapatilla deportiva',
      imagen: 'img/zapa.jpg',
    },
  ];

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProductos),
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza los productos correctamente', async () => {
    render(<Productos />);
    expect(await screen.findByText('Zapatilla A')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  test('agrega un producto al carrito al hacer clic', async () => {
    render(<Productos />);
    const boton = await screen.findByText('Agregar al carrito');
    fireEvent.click(boton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'carrito',
        expect.any(String)
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'totalCarrito',
        100
      );
    });
  });
});