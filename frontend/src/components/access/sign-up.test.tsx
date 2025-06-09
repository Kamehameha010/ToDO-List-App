import { render, fireEvent, screen } from "@testing-library/preact";
import { describe, expect } from "vitest";
import SignUp from "./sign-up";

describe("<SignUp />", () => {
  it("renders name, email and password fields and sign in button", () => {
    const { getByLabelText, getByRole } = render(<SignUp />);

    expect(getByLabelText(/full name/i)).toBeDefined();
    expect(getByLabelText(/email/i)).toBeDefined();
    expect(getByLabelText(/password/i)).toBeDefined();
    expect(getByRole("button", { name: /Create Account/i })).toBeDefined();
  });

  it("allows typing in email and password fields", () => {
    render(<SignUp />);
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByRole("textbox", {
      name: /password/i,
    }) as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: "jhonDoe@example.com" } });
    fireEvent.input(passwordInput, { target: { value: "secret" } });
    expect(emailInput.value).toBe("jhonDoe@example.com");
    expect(passwordInput.value).toBe("secret");
  });

  it("rejects invalid email format and prevents form submission", () => {
    const { container } = render(<SignUp />);
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;

    const button = screen.getByRole("button", { name: /create account/i });
    const form = container.querySelector("form");
    fireEvent.input(emailInput, {
      target: { value: "johnDoegmail.com", name: "email" },
    });

    fireEvent.submit(button);

    expect(form?.checkValidity()).toBe(false);
  });


  it("toggles password visibility", () => {
    const { getByPlaceholderText, container } = render(<SignUp />);
    const passwordInput = getByPlaceholderText(
      /your password/i
    ) as HTMLInputElement;
    const toggleBtn = container.querySelector(
      'button[type="button"]'
    ) as HTMLButtonElement;
    expect(passwordInput.type).toBe("password");
    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe("text");
    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe("password");
  });
});
