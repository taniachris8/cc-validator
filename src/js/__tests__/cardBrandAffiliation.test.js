import { detectBrand } from "../cardBrandAffiliation";

describe("testing detectBrand function", () => {
  test("should ignore spaces and dashes", () => {
    expect(detectBrand("477-391-372-210-0048")).toEqual("Visa");
    expect(detectBrand("477 391 372 210 0048")).toEqual("Visa");
  });

  test("should return a correct brand name", () => {
    const visa = "4773913722100048";
    const discover = "6011674899664300";
    const diners = "36968260827767";
    const mastercard = "2720996142815814";
    const mastercard2 = "5516786435525084";
    const jcb = "3545350083626957";
    const americanExpress = "349624149314251";
    const mir = "2200123456789012";

    expect(detectBrand(visa)).toEqual("Visa");
    expect(detectBrand(discover)).toEqual("Discover");
    expect(detectBrand(diners)).toEqual("Diners Club");
    expect(detectBrand(mastercard)).toEqual("MasterCard");
    expect(detectBrand(mastercard2)).toEqual("MasterCard");
    expect(detectBrand(jcb)).toEqual("JCB");
    expect(detectBrand(americanExpress)).toEqual("American Express");
    expect(detectBrand(mir)).toEqual("MIR");
  });
});
