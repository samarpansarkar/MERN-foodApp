import {
  apiLimiter,
  authLimiter,
  orderLimiter,
} from "../middleware/rateLimiter.js";

describe("Rate Limiter Middleware", () => {
  test("apiLimiter is defined and is a function", () => {
    expect(apiLimiter).toBeDefined();
    expect(typeof apiLimiter).toBe("function");
  });

  test("authLimiter is defined and is a function", () => {
    expect(authLimiter).toBeDefined();
    expect(typeof authLimiter).toBe("function");
  });

  test("orderLimiter is defined and is a function", () => {
    expect(orderLimiter).toBeDefined();
    expect(typeof orderLimiter).toBe("function");
  });
});
