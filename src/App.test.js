import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import App from "./App";

describe("App Component", () => {
  it("shows 'No News For Today' if fetching data fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    await act(async () => {
      render(<App />);
    });

    const noNewsMessage = await waitFor(() =>
      screen.getByText("No News For Today")
    );
    expect(noNewsMessage).toBeInTheDocument();
  });

  it("shows 'No News For Today' when there are no articles", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: [] }),
    });

    await act(async () => {
      render(<App />);
    });

    const noNewsMessage = await screen.findByText("No News For Today");
    expect(noNewsMessage).toBeInTheDocument();
  });

  it("uses placeholder image if an image fails to load", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        articles: [
          {
            id: 9000,
            head: "My Article",
            teaser: "Something interesting here to bait the viewers.",
            byline: { text: "Minh Nguyen" },
            image: "404-image-not-found.jpg",
          },
        ],
      }),
    });

    await act(async () => {
      render(<App />);
    });

    const articleHeader = await screen.findByText("My Article");
    expect(articleHeader).toBeInTheDocument();

    const articleTeaser = screen.getByText(
      "Something interesting here to bait the viewers."
    );
    expect(articleTeaser).toBeInTheDocument();

    const articleAuthor = screen.getByText("Minh Nguyen");
    expect(articleAuthor).toBeInTheDocument();

    const img = await screen.findByAltText("My Article");

    act(() => {
      img.dispatchEvent(new Event("error"));
    });

    expect(img).toHaveAttribute("src", "placeholder.webp");
  });

  it("displays article correctly when data is loaded", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        articles: [
          {
            id: 9000,
            head: "My Article",
            teaser: "Something interesting here to bait the viewers.",
            byline: { text: "Minh Nguyen" },
            image: "ABCDEFG/final-final-last-article-cover-image-7.jpg",
          },
        ],
      }),
    });

    await act(async () => {
      render(<App />);
    });

    const articleHeader = await screen.findByText("My Article");
    expect(articleHeader).toBeInTheDocument();

    const articleTeaser = screen.getByText(
      "Something interesting here to bait the viewers."
    );
    expect(articleTeaser).toBeInTheDocument();

    const articleAuthor = screen.getByText("Minh Nguyen");
    expect(articleAuthor).toBeInTheDocument();

    const articleImage = screen.getByAltText("My Article");
    expect(articleImage).toHaveAttribute(
      "src",
      "/images/final-final-last-article-cover-image-7.jpg"
    );
  });
});
