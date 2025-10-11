import { isValid } from "../cardNumberValidator";

describe("testing isValid function", () => {

    test("should ignore spaces and dashes", () => {
      expect(isValid("477-391-372-210-0048")).toBeTruthy();
      expect(isValid("477 391 372 210 0048")).toBeTruthy();
    });

    test("should return false if number is less than 13", () => { 
        expect(isValid("47730048")).toBeFalsy();
    })

     test("should return false if number is longer than 19", () => {
       expect(isValid("445278965412365478526")).toBeFalsy();
     });
    
    test("should return true if a number is valid", () => {
        expect(isValid("4773913722100048")).toBeTruthy();
        expect(isValid("6011674899664300")).toBeTruthy();
        expect(isValid("2720996142815814")).toBeTruthy();
      });
});
