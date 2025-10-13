/**
 * @jest-environment jsdom
 */

import CardFormWidget from "../widget.js";

describe("Form input validation", () => {
  let container, widget;

  beforeEach(() => {
    document.body.innerHTML = `<div class="container"></div>`;
    container = document.querySelector(".container");
    widget = new CardFormWidget(container);
    widget.bindToDOM();
  });

  test.each([
    ["4773913722100048", "valid"],
    ["4545212453", "invalid"],
  ])("should mark card number %s as %s", (cardNumber, expectedClass) => {
    widget.input.value = cardNumber;
    widget.submit.click();
    expect(widget.input.classList.contains(expectedClass)).toBe(true);
  });
});
