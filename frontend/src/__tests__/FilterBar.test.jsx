import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FilterBar from '../components/Filters/FilterBar';

// Mock the slice to avoid axios import issues in tests
jest.mock('../redux/slices/foodSlice', () => ({
    selectFilters: (state) => state.food.filters,
    setSortBy: jest.fn(),
    setPriceRange: jest.fn(),
}));
const renderWithRedux = (
    component,
    {
        initialState,
        store = configureStore({
            reducer: {
                food: (state = initialState?.food || { filters: { sortBy: 'relevant', priceRange: 'all' } }, action) => state
            },
            preloadedState: initialState,
        }),
    } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
};

describe('FilterBar Component', () => {
    test('renders all filter options', () => {
        renderWithRedux(<FilterBar />, {
            initialState: {
                food: {
                    filters: {
                        sortBy: 'relevant',
                        type: 'all',
                        priceRange: 'all'
                    }
                }
            }
        });

        expect(screen.getByText('Relevance')).toBeInTheDocument();
        const priceElements = screen.getAllByText(/Price/i);
        expect(priceElements.length).toBeGreaterThan(0);
        expect(screen.getByText('Under $10')).toBeInTheDocument();
    });
});
