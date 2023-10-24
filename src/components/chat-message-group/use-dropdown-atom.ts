import { atom, useAtom } from 'jotai';

type DropdownAtom = {
  open: boolean;
  messageId: string | null;
};

const dropdownAtom = atom<DropdownAtom>({
  open: false,
  messageId: null,
});

type UseDropdownAtomArugments = {
  messageId: string;
};

export const useDropdownAtom = ({ messageId }: UseDropdownAtomArugments) => {
  const [dropdown, setDropdown] = useAtom(dropdownAtom);

  const isOpen = dropdown.open && messageId === dropdown.messageId;

  const openDropdownForCurrentMessage = () => {
    setDropdown({ messageId, open: true });
  };

  const closeDropdown = () => {
    setDropdown({ messageId: null, open: false });
  };

  return { isOpen, setDropdown, openDropdownForCurrentMessage, closeDropdown };
};
