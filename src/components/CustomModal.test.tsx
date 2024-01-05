import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CustomModal from "./CustomModal";

describe("CustomModal Component", () => {
  let label: string, text: string;
  const mockSetIsOpen = vi.fn();

  beforeEach(() => {
    label = "label";
    text = "This is a test modal";

    render(
      <CustomModal
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        handleConfirm={() => console.log("confirm")}
        label={label}
        text={text}
      />
    );
  });

  it("renders Custom Modal correctly", () => {
    const modalLabel = screen.getByTestId("modal-label");
    const modalText = screen.getByTestId("modal-text");

    expect(modalLabel).toBeInTheDocument();
    expect(modalLabel).toHaveTextContent(label);

    expect(modalText).toBeInTheDocument();
    expect(modalText).toHaveTextContent(text);
  });

  it("No button invokes setIsOpen", async () => {
    const noButton = screen.getByRole("button", { name: "No" });

    await userEvent.click(noButton);
    expect(mockSetIsOpen).toHaveBeenCalled();
  });
});
