import { errorHandler, notFoundHandler } from "../middleware/errorHandler.js";

describe("Error Handling Middleware", () => {
  test("errorHandler is defined and is a function with 4 parameters", () => {
    expect(errorHandler).toBeDefined();
    expect(typeof errorHandler).toBe("function");
    expect(errorHandler.length).toBe(4);
  });

  test("notFoundHandler is defined and is a function with 2 parameters", () => {
    expect(notFoundHandler).toBeDefined();
    expect(typeof notFoundHandler).toBe("function");
    expect(notFoundHandler.length).toBe(2);
  });

  test("notFoundHandler returns 404 status", () => {
    const mockReq = {
      originalUrl: "/test-url",
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    notFoundHandler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "Route /test-url not found",
    });
  });
});
