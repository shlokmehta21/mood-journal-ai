import { screen, render } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "../app/page";

vi.mock("@clerk/nextjs", () => {
  return {
    auth: () =>
      new Promise((resolve) => resolve({ userId: "heuhehf-3454nfffff" })),
    ClerkProvider: ({ children }: any) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_2NNEqL2nrIRdJ194ndJqAHwEfxC",
        fullName: "Charles Harris",
      },
    }),
  };
});

test("Home", async () => {
  render(await HomePage());
  expect(screen.getByText("Get started")).toBeTruthy();
});
