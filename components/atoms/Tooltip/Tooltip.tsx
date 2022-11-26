import { ReactNode } from 'react';

type TooltipProps = {
  icon?: ReactNode;
  text: string;
};

export const Tooltip = ({ icon, text }: TooltipProps) => {
  return (
    <div role='tooltip'>
      {icon && icon}
      <p>{text}</p>
    </div>
  );
};
