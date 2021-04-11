import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PhotoPanel from "./PhotoPanel";
import { photos, handlers } from "./PhotoPanel.handlers";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads photos", async () => {
  render(
    <QueryClientProvider client={client}>
      <PhotoPanel />
    </QueryClientProvider>
  );
  await waitFor(() => screen.getByText(photos[0].caption));
});
