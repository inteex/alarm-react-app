import { render, screen } from "@testing-library/react";
import exp from "constants";
import Moadl, { ModalProps } from "./modal";
const modalMockProps: ModalProps = {
  isOpen: true,
  onClose: () => {},
  onConfirm: () => {},
  children: undefined,
};
describe("modal test", () => {
  test("count modal buttons", async () => {
    render(<Moadl {...modalMockProps} />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(3);
  });
});
