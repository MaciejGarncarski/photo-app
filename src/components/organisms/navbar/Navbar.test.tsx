import { screen } from '@testing-library/react';

import { render } from '@/src/utils/tests/utils';

import { Navbar } from './Navbar';
import { NavbarForDesktop } from './NavbarForDesktop';

const getNavbar = ({ forDesktop }: { forDesktop?: boolean }) => {
  if (forDesktop) {
    render(<NavbarForDesktop />);
    return screen.queryByRole('navigation');
  }

  render(<Navbar />);
  return screen.queryByRole('navigation');
};

const setWindowWidth = (width: number) => (global.innerWidth = width);

describe('Navbar test', () => {
  describe('desktop navbar', () => {
    it('should be displayed on desktop resolution', async () => {
      setWindowWidth(1300);
      const navbar = getNavbar({ forDesktop: true });
      expect(navbar).toBeInTheDocument();
    });

    it('should not be displayed on mobile resolution', () => {
      setWindowWidth(300);
      const navbar = getNavbar({ forDesktop: true });
      expect(navbar).not.toBeInTheDocument();
    });
  });

  describe('mobile navbar', () => {
    it('should be displayed on mobile resolution', async () => {
      setWindowWidth(300);
      const navbar = getNavbar({ forDesktop: false });
      expect(navbar).toBeInTheDocument();
    });
    it('should not be displayed on desktop resolution', () => {
      setWindowWidth(1300);
      const navbar = getNavbar({ forDesktop: false });
      expect(navbar).not.toBeInTheDocument();
    });
  });
});
