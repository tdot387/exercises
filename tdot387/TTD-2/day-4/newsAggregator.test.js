import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { NewsAggregator } from "./newsAggregator.js";

const server = setupServer(
  http.get("https://api.technews.com/articles", () => {
    

    return HttpResponse.json({
      articles: [
        { id: 1, title: "AI Breakthrough", category: "tech", views: 1000 },
        { id: 2, title: "New Framework Released", category: "tech", views: 500 },
      ],
    });
  }),

  http.get("https://api.worldnews.com/latest", () => {
    return HttpResponse.json({
      articles: [
        { id: 3, title: "Global Summit", views: 2000 },
        { id: 4, title: "Merz steps down as chancellor", views: 80000 },
      ],
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("NewsAggregator", () => {
  test("fetches articles from multiple sources", async () => {
    const aggregator = new NewsAggregator();

    const articles = await aggregator.fetchArticles();

    expect(articles).toHaveLength(4);
    expect(articles[0].title).toBe("AI Breakthrough");
    expect(articles[2].title).toBe("Global Summit");
  });

  test("handles API errors gracefully", async () => {
    server.use(
      http.get("https://api.technews.com/articles", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const aggregator = new NewsAggregator();

    const articles = await aggregator.fetchArticles();

    expect(articles).toHaveLength(2);
    expect(articles[0].title).toBe("Global Summit");
  });

  test("fetches articles by category", async () => {
    const aggregator = new NewsAggregator();

    const articles = await aggregator.fetchByCategory("tech");

    expect(articles).toHaveLength(2);
  });

  test("throws error when category is missing", async () => {
    const aggregator = new NewsAggregator();

    await expect(aggregator.fetchByCategory("")).rejects.toThrow(
      "Category is required",
    );
  });

  test("returns top headlines sorted by views", async () => {
    const aggregator = new NewsAggregator();

    const headlines = await aggregator.getTopHeadlines(3);

    expect(headlines).toHaveLength(3);
  });

  test("handles 500 server error", async () => {
    server.use(
      http.get('https://api.technews.com/articles', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const aggregator = new NewsAggregator();

    const articles = await aggregator.fetchArticles();

    expect(articles).toHaveLength(2);
  });
});
