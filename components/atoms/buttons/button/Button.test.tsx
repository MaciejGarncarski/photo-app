import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '@/components/atoms/buttons/button/Button';

describe('button component', () => {
  describe('props', () => {
    it('should render button type submit', () => {
      render(<Button type="submit">lorem</Button>);
      const button = screen.getByRole('button', {
        name: /lorem/i,
      });
      expect(button).toHaveAttribute('type', 'submit');
    });
    it('should render primary button', () => {
      render(<Button type="button">lorem</Button>);
      expect(screen.getByText(/lorem/i).classList).not.toContain('button-secondary');
    });
    it('should render secondary button', () => {
      render(
        <Button type="button" variant="secondary">
          lorem
        </Button>,
      );
      expect(screen.getByText(/lorem/i).classList).toContain('button-secondary');
    });
    it('should be disabled', () => {
      render(
        <Button type="button" disabled>
          lorem
        </Button>,
      );
      const button = screen.getByRole('button', {
        name: /lorem/i,
      });
      expect(button).toHaveAttribute('disabled', '');
    });
    it('should be enabled', () => {
      render(
        <Button type="button" disabled={false}>
          lorem
        </Button>,
      );

      const button = screen.getByRole('button', {
        name: /lorem/i,
      });

      expect(button).not.toHaveAttribute('disabled', '');
    });

    it('should contain className from prop', () => {
      const customClassName = 'cuStomCustOmM';

      render(
        <Button type="button" className={customClassName}>
          lorem
        </Button>,
      );
      expect(
        screen.getByRole('button', {
          name: /lorem/i,
        }).classList,
      ).toContain(customClassName);
    });
  });

  describe('user integration', () => {
    it('should detect when clicks', () => {
      const someOnClick = jest.fn();
      render(
        <Button type="button" onClick={someOnClick}>
          lorem
        </Button>,
      );

      const button = screen.getByRole('button', {
        name: /lorem/i,
      });

      fireEvent.click(button);

      expect(someOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
