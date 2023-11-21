import { fullnameValidator } from "../../functions/fullnameValidator";

describe(" Fullname regex validator", () => {
    
    test("return false for empty string", () => {
        expect(fullnameValidator("")).toBe(false)
    })

    test("return false for length of 1 of a string", () => {
        expect(fullnameValidator("a")).toBe(false)
    })

    test("return false for length of 2 of a string", () => {
        expect(fullnameValidator("af")).toBe(false)
    })

    test("return false for length of 1 of numerical value", () => {
        expect(fullnameValidator("1")).toBe(false)
    })

    test("return false for length of 2 of numerical value", () => {
        expect(fullnameValidator("12")).toBe(false)
    })

    test("return false for length of 21 and above", () => {
        expect(fullnameValidator("aaaaaaaaaaaaaaaaaaaaa")).toBe(false)
    })

    test("return true for length of 3", () => {
        expect(fullnameValidator("abc"))
            .toBe(true)
    })

    test("return true for legnth of 20", () => {
        expect(fullnameValidator("abcccccccccccccccccc")).toBe(true)
    })
})
