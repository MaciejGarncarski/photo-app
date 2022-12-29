import React from 'react';

import { DropZoneContainer } from '@/components/atoms/dropZoneContainer/DropZoneContainer';

import { fireEvent, render } from '@/tests/utils';

describe('<DropZoneContainer />', () => {
  it('should display error when no image dropped', async () => {
    const mockedFn = jest.fn();

    const { findByTestId } = render(
      <DropZoneContainer
        className=''
        onClick={mockedFn}
        onDragEnter={mockedFn}
        onDragLeave={mockedFn}
        onDragOver={mockedFn}
        onDrop={mockedFn}
      >
        <p>test</p>
      </DropZoneContainer>
    );

    const dropZone = await findByTestId('drop-zone');
    fireEvent.drop(dropZone);
    expect(mockedFn).toHaveBeenCalled();
  });
});
