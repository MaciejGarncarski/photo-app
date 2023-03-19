type Button = {
  variant?: 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'submit' | 'button';
  text: string;
};

export const getButtonList = (open: () => void, submitDisabled: boolean) => {
  const buttonList: Array<Button> = [
    {
      variant: 'secondary',
      onClick: open,
      text: 'Cancel',
      type: 'button',
    },
    {
      disabled: submitDisabled,
      type: 'submit',
      text: 'Upload new post',
    },
  ];

  return buttonList;
};
