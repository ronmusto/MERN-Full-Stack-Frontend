import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AI from './pages/AI';
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';

process.env.NODE_ENV = 'test';

fetchMock.enableMocks();

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div></div>,
}));

beforeEach(() => {
  fetch.resetMocks();
});

test('renders without crashing', () => {
  render(<AI />);
});

test('form inputs update on change', () => {
  render(<AI />);

  fireEvent.change(screen.getByTestId('medInc'), { target: { value: '3' } });
  expect(screen.getByTestId('medInc').value).toBe('3');

  fireEvent.change(screen.getByTestId('houseAge'), { target: { value: '25' } });
  expect(screen.getByTestId('houseAge').value).toBe('25');

  fireEvent.change(screen.getByTestId('aveRooms'), { target: { value: '5' } });
  expect(screen.getByTestId('aveRooms').value).toBe('5');

  fireEvent.change(screen.getByTestId('aveBedrms'), { target: { value: '2' } });
  expect(screen.getByTestId('aveBedrms').value).toBe('2');

  fireEvent.change(screen.getByTestId('population'), { target: { value: '2500' } });
  expect(screen.getByTestId('population').value).toBe('2500');

  fireEvent.change(screen.getByTestId('aveOccup'), { target: { value: '5' } });
  expect(screen.getByTestId('aveOccup').value).toBe('5');

  fireEvent.change(screen.getByTestId('latitude'), { target: { value: '35' } });
  expect(screen.getByTestId('latitude').value).toBe('35');

  fireEvent.change(screen.getByTestId('longitude'), { target: { value: '-120' } });
  expect(screen.getByTestId('longitude').value).toBe('-120');

});

test('form submits correctly and updates state', async () => {
  const fakeResponse = {
    prediction: 3,
    importances: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
  };

  fetch.mockResponseOnce(JSON.stringify(fakeResponse));

  render(<AI />);

  fireEvent.submit(screen.getByTestId('predict-form'));

  await waitFor(() => expect(fetch).toHaveBeenCalled());

  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:5000/predict',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ input: ['2.5', '35', '5', '1', '1000', '3', '34', '-118'] })
    })
  );

  await waitFor(() => expect(screen.getByTestId('prediction-result').textContent).toBe(`Predicted Price: $300,000.00`));
});