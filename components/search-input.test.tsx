import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchInput } from "./search-input";

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("SearchInput debounce", () => {
  it("delivers only the latest value after the delay", () => {
    const onDebouncedChange = vi.fn();
    const onChange = vi.fn();
    render(
      <SearchInput
        aria-label="Search"
        debounce={100}
        onChange={onChange}
        onDebouncedChange={onDebouncedChange}
      />,
    );

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "first" },
    });
    vi.advanceTimersByTime(50);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "latest" },
    });
    vi.advanceTimersByTime(99);
    expect(onDebouncedChange).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(2);
    vi.advanceTimersByTime(1);
    expect(onDebouncedChange).toHaveBeenCalledTimes(1);
    expect(onDebouncedChange).toHaveBeenCalledWith("latest");
  });

  it("does not let a second input cancel the first input's callback", () => {
    const first = vi.fn();
    const second = vi.fn();
    render(
      <>
        <SearchInput aria-label="First" onDebouncedChange={first} />
        <SearchInput aria-label="Second" onDebouncedChange={second} />
      </>,
    );

    fireEvent.change(screen.getByRole("searchbox", { name: "First" }), {
      target: { value: "one" },
    });
    fireEvent.change(screen.getByRole("searchbox", { name: "Second" }), {
      target: { value: "two" },
    });
    vi.advanceTimersByTime(220);
    expect(first).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledWith("one");
    expect(second).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledWith("two");
  });

  it("cancels a pending callback when its input unmounts", () => {
    const callback = vi.fn();
    const { unmount } = render(
      <SearchInput aria-label="Search" onDebouncedChange={callback} />,
    );
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "pending" },
    });
    unmount();
    vi.advanceTimersByTime(220);
    expect(callback).not.toHaveBeenCalled();
  });
});
