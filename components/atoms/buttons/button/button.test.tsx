import { render, screen } from '@testing-library/react';

import { Button } from '@/components/atoms/buttons/button/Button';

const getButton = () => {
  return screen.getByRole('button', {
    name: /lorem/i,
  });
};

describe('button component', () => {
  describe('props', () => {
    it('should render button type submit', () => {
      render(<Button type="submit">lorem</Button>);
      const button = getButton();
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should render primary button', () => {
      render(<Button type="button">lorem</Button>);
      const button = getButton();
      expect(button.classList).not.toContain('button-secondary');
    });

    it('should render secondary button', () => {
      render(
        <Button type="button" variant="secondary">
          lorem
        </Button>,
      );
      const button = getButton();
      expect(button.classList).toContain('button-secondary');
    });

    it('should be disabled', () => {
      render(
        <Button type="button" disabled>
          lorem
        </Button>,
      );

      const button = getButton();
      expect(button).toHaveAttribute('disabled', '');
    });

    it('should be enabled', () => {
      render(
        <Button type="button" disabled={false}>
          lorem
        </Button>,
      );
      const button = getButton();

      expect(button).not.toHaveAttribute('disabled', '');
    });

    it('should contain className from prop', () => {
      const customClassName = 'cuStomCustOmM';

      render(
        <Button type="button" className={customClassName}>
          lorem
        </Button>,
      );
      const button = getButton();
      expect(button.classList).toContain(customClassName);
    });
  });
});
