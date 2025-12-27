import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../components/UI/Button';

describe('Button Component', () => {
    test('renders button with text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    test('handles click events', async () => {
        const handleClick = jest.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click me</Button>);
        await user.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('shows loading state', () => {
        render(<Button loading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-busy', 'true');
        expect(button).toBeDisabled();
    });

    test('is disabled when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    test('renders with different sizes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        let button = screen.getByRole('button');
        expect(button.className).toContain('py-2');

        rerender(<Button size="lg">Large</Button>);
        button = screen.getByRole('button');
        expect(button.className).toContain('py-4');
    });

    test('applies custom className', () => {
        render(<Button className="custom-class">Custom</Button>);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    test('has correct button type', () => {
        render(<Button type="submit">Submit</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    test('default button type is button', () => {
        render(<Button>Default</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
});
