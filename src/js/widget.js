import { isValid } from "./cardNumberValidator";
import { detectBrand } from "./cardBrandAffiliation";

import visa from "../img/visa.png";
import americanExpress from "../img/american-express.png";
import masterCard from "../img/master-card.png";
import diners from "../img/diners.png";
import discover from "../img/discover.png";
import jcb from "../img/jcb.png";
import mir from "../img/mir.png";

export default class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
        <img alt="visa" src=${visa} class="icon inactive" data-brand="Visa">
        <img alt="american-express" src=${americanExpress} class="icon inactive" data-brand="American Express">
        <img alt="master-card" src=${masterCard} class="icon inactive" data-brand="MasterCard">
        <img alt="diners" src=${diners} class="icon inactive" data-brand="Diners Club">
        <img alt="discover" src=${discover} class="icon inactive" data-brand="Discover">
        <img alt="jcb" src=${jcb} class="icon inactive" data-brand="JCB">
        <img alt="mir" src=${mir} class="icon inactive" data-brand="MIR">
  
        <form class="card-validator-form">
            <input type="text" id="card-number-input" class="input">
            <button class="submit">Click to Validate</button>
        </form>
        `;
  }

  static get submitSelector() {
    return ".submit";
  }

  static get inputSelector() {
    return ".input";
  }

  static get selector() {
    return ".card-validator-form";
  }

  static get iconSelector() {
    return ".icon";
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardFormWidget.markup;

    this.element = this.parentEl.querySelector(CardFormWidget.selector);
    this.submit = this.element.querySelector(CardFormWidget.submitSelector);
    this.input = this.element.querySelector(CardFormWidget.inputSelector);

    this.element.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    const value = this.input.value;

    if (isValid(value)) {
      this.input.classList.add("valid");
      this.input.classList.remove("invalid");

      const brand = detectBrand(value);

      this.icons = this.parentEl.querySelectorAll(CardFormWidget.iconSelector);

      this.icons.forEach((icon) => {
        if (icon.dataset.brand === brand) {
          icon.classList.remove("inactive");
          icon.classList.add("active");
        } else {
          icon.classList.remove("active");
          icon.classList.add("inactive");
        }
      });
    } else {
      this.input.classList.add("invalid");
      this.input.classList.remove("valid");
    }
  }
}
