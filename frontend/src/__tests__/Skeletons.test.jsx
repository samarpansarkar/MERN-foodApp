import React from 'react';
import { render, screen } from '@testing-library/react';
import Skeleton from '../components/UI/Skeleton';
import FoodItemSkeleton from '../components/Skeletons/FoodItemSkeleton';
import MenuSkeleton from '../components/Skeletons/MenuSkeleton';

describe('Skeleton Components', () => {
  test('Skeleton renders with correct classes', () => {
    const { container } = render(<Skeleton className="test-class" />);
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'test-class');
  });

  test('FoodItemSkeleton renders correctly', () => {
    const { container } = render(<FoodItemSkeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
    // Should have multiple skeletons inside
    const skeletons = container.getElementsByClassName('bg-gray-200');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('MenuSkeleton renders correctly', () => {
    const { container } = render(<MenuSkeleton />);
    // Should have circle and text skeletons
    const skeletons = container.getElementsByClassName('bg-gray-200');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
