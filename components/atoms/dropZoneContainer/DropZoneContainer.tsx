import { DragEvent, forwardRef, ReactNode } from 'react';

type DropZoneContainerProps = {
  onClick: () => void;
  onDragOver: (dragEv: DragEvent<HTMLDivElement>) => void;
  onDragEnter: (dragEv: DragEvent<HTMLDivElement>) => void;
  onDrop: (dragEv: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (dragEv: DragEvent<HTMLDivElement>) => void;
  className: string;
  children: ReactNode;
};

export const DropZoneContainer = forwardRef<HTMLDivElement, DropZoneContainerProps>(
  ({ onClick, onDragEnter, onDragLeave, onDragOver, onDrop, className, children }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        className={className}
        data-testid='drop-zone'
      >
        {children}
      </div>
    );
  }
);
