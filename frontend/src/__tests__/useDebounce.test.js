import { renderHook, act } from "@testing-library/react";
import useDebounce from "../hooks/useDebounce";

test("should return debounced value", () => {
  jest.useFakeTimers();
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    {
      initialProps: { value: "initial", delay: 500 },
    }
  );

  expect(result.current).toBe("initial");

  // Update value
  rerender({ value: "updated", delay: 500 });

  // Should not update immediately
  expect(result.current).toBe("initial");

  // Fast-forward time
  act(() => {
    jest.advanceTimersByTime(500);
  });

  // Should update after delay
  expect(result.current).toBe("updated");

  jest.useRealTimers();
});
