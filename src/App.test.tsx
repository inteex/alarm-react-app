import { render, screen } from "@testing-library/react";
import App from "./App";

test("redenrs Ajouter une alarme button", () => {
  render(<App />);
  const linkElement = screen.getByText(/Ajouter une alarme/i);
  expect(linkElement).toBeInTheDocument();
});

test("DigitalClock child component is rendred in App", () => {
  const componenet = render(<App />);
  const childElement = componenet.getByTestId("today-date");

  expect(childElement).toBeInTheDocument();
  expect(childElement.textContent).toEqual(new Date().toLocaleDateString("fr-FR"));
});
