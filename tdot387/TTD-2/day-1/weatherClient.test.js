const WeatherClient = require("./weatherClient");

describe("WeatherClient", () => {
  let client;

  beforeEach(() => {
    client = new WeatherClient("test-api-key");
    // Reset fetch mock before each test
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Original fetch wiederherstellen
  });

  describe("getWeather", () => {
    test("returns weather data for valid city", async () => {
      const mockResponse = {
        location: { name: "Berlin" },
        current: {
          temp_c: 22,
          condition: { text: "Sunny" },
          humidity: 45,
        },
      };

      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      const weather = await client.getWeather("Berlin");

      // Assert - Check the result
      expect(weather).toEqual({
        city: "Berlin",
        temperature: 22,
        condition: "Sunny",
        humidity: 45,
      });
    });
    test("fetch is called with correct URL", async () => {
      const mockRes = {
        location: { name: "Berlin" },
        current: {
          temp_c: 22,
          condition: { text: "Sunny" },
          humidity: 45,
        },
      };

      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockRes,
      });

      await client.getWeather("Berlin");

      expect(fetch).toHaveBeenCalledWith(
        `https://api.weather.com/v1/weather?city=Berlin&apiKey=test-api-key`,
      );
    });

    test("throws error when city is missing", async () => {
      await expect(client.getWeather()).rejects.toThrow("City is required");
      await expect(client.getWeather("")).rejects.toThrow("City is required");
      await expect(client.getWeather(null)).rejects.toThrow("City is required");
    });

    test("throws a 404 error if city is not found", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(client.getWeather("hAsfmk")).rejects.toThrow(
        "City not found: hAsfmk",
      );
    });

    test("throws a 401 error if api key is invalid", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 401,
      });

      await expect(client.getWeather("Berlin")).rejects.toThrow(
        "Invalid API key",
      );
    });

    test("throws a 500 error if api key is invalid", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(client.getWeather("Berlin")).rejects.toThrow("Error: 500");
    });
  });

  describe("getForecast", () => {
    let client;

    beforeEach(() => {
      client = new WeatherClient("test-api-key");
      // Reset fetch mock before each test
      jest.spyOn(global, "fetch");
    });

    afterEach(() => {
      jest.restoreAllMocks(); // Original fetch wiederherstellen
    });

    test("forecast is fetched successful", async () => {
      const mockRes = {
        forecast: [
          {
            date: "2024-01-15",
            day: {
              maxtemp_c: 12,
              mintemp_c: 5,
              condition: {
                text: "Rainy",
              },
            },
          },
          {
            date: "2024-01-16",
            day: {
              maxtemp_c: 12,
              mintemp_c: 5,
              condition: {
                text: "Rainy",
              },
            },
          },
          {
            date: "2024-01-17",
            day: {
              maxtemp_c: 18,
              mintemp_c: 7,
              condition: {
                text: "Cloudy",
              },
            },
          },
        ],
      };

      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockRes,
      });

      const forecast = await client.getForecast("Berlin", 3);

      // Assert - Check the result
      expect(forecast[2]).toEqual({
        date: "2024-01-17",
        maxTemp: 18,
        minTemp: 7,
        condition: "Cloudy",
      });
      expect(forecast[0].minTemp).toBe(5);
    });
    test("three days is used as default if not stated differently", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ forecast: [] }),
      });

      await client.getForecast("Berlin");

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("days=3"));
    });

    test("days must have a value bigger than 0", async () => {
      await expect(client.getForecast("Berlin", 0)).rejects.toThrow(
        "Days must be between 1 and 7",
      );
    });

    test("days must have a value smaller than 8", async () => {
      await expect(client.getForecast("Berlin", 8)).rejects.toThrow(
        "Days must be between 1 and 7",
      );
    });

    test("throws error when city is missing", async () => {
      await expect(client.getForecast("", 5)).rejects.toThrow(
        "City is required",
      );
    });

    // TODO: Write a test that checks an error is thrown when city is missing
  });
});
