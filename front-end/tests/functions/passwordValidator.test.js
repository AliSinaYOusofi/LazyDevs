import { passwordValidator } from "../../functions/passwordValidator"

describe("Test for password validator", () => {
    
    test("return false for length of smaller than 8", () => {
        expect(passwordValidator("1234567")).toBe(false)
    })

    test("return false for values without special chars", () => {
        expect(passwordValidator("abcdefgh1")).toBe(false)
    })

    test("return false for value without alpha", () => {
        expect(passwordValidator("1234567_")).toBe(false)
    })

    test("return false for value without numbers", () => {
        expect(passwordValidator("abcdefgh@")).toBe(false)
    })

    test("return false for lenght of more than 50", () => {
        expect(passwordValidator("alsdjf;alsdkfj;alsdjf;lasjd;fljas;dlfjasdjfsadjflasdfkjasdfkja;sdfjas")).toBe(false)
    })

    test("return true for lenght of 8, one special char, and one numeric and Alpha", () => {
        expect(passwordValidator("Abcddef1#")).toBe(true)
    })
})