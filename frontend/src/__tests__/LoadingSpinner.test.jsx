import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/UI/LoadingSpinner';

describe('LoadingSpinner Component', () => {
    test('renders spinner', () => {
        const { container } = render(<LoadingSpinner />);
        const spinner = container.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
    });

    test('renders with small size', () => {
        const { container } = render(<LoadingSpinner size="sm" />);
        const spinner = container.querySelector('.w-4');
        expect(spinner).toBeInTheDocument();
    });

    test('renders with medium size by default', () => {
        const { container } = render(<LoadingSpinner />);
        const spinner = container.querySelector('.w-8');
        expect(spinner).toBeInTheDocument();
    });

    test('renders with large size', () => {
        const { container } = render(<LoadingSpinner size="lg" />);
        const spinner = container.querySelector('.w-12');
        expect(spinner).toBeInTheDocument();
    });

    test('renders with primary color by default', () => {
        const { container } = render(<LoadingSpinner />);
        const spinner = container.querySelector('.border-primary-200');
        expect(spinner).toBeInTheDocument();
    });

    test('renders with white color', () => {
        const { container } = render(<LoadingSpinner color="white" />);
        const spinner = container.querySelector('.border-t-white');
        expect(spinner).toBeInTheDocument();
    });

    test('applies custom className', () => {
        const { container } = render(<LoadingSpinner className="my-custom-class" />);
        const wrapper = container.querySelector('.my-custom-class');
        expect(wrapper).toBeInTheDocument();
    });
});
