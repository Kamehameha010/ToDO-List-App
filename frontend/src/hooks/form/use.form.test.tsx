import { useForm } from "./use-form";
import { renderHook, act } from "@testing-library/preact";
import type { TargetedEvent } from "preact/compat";
import { describe, expect, it } from "vitest";

describe("useForm", () => {
  it("initialize state without error", () => {
    const { result } = renderHook(() => useForm({ name: "", email: "" }));
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.formData.name).toBe("");
    expect(result.current.formData.email).toBe("");
  });

  it("updates the 'email' field with a valid value and shows an error for the empty 'password' field", () => {
    const { result } = renderHook(() => useForm({ name: "", email: "" }));

    act(() => {
      result.current.handleChange({
        currentTarget: {
          name: "email",
          value: "jhonDoe@gmail.com",
          ariaRequired: "true",
        }
      } as TargetedEvent<HTMLInputElement, Event>);

      result.current.handleChange({
        currentTarget: {
          name: "password",
          value: "",
          ariaRequired: "true",
        }
      } as TargetedEvent<HTMLInputElement, Event>);
    });

    expect(result.current.formData.email).toBe("jhonDoe@gmail.com");
    expect(result.current.error?.email).toBe("");
    expect(result.current.error?.password).toBe("Password field is required");
    expect(result.current.isSuccess).toBe(false);
    
  });
});
