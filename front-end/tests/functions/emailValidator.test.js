import { emailValidator } from "../../functions/emailValidator";

describe("testing email address regex", () => {
    
    test("return false for non @ char", () => {
        expect(emailValidator("asdfsfdgmail.com")).toBe(false)
    })

    test("return false for non chars before @", () => {
        expect(emailValidator("@gmail.com")).toBe(false)
    })

    test("return false for emails with domain of lenght 1", () => {
        expect(emailValidator("ali@g")).toBe(false)
    })

    test("return false for emails with domain of lenght 2", () => {
        expect(emailValidator("ali@ga")).toBe(false)
    })
    
    test("return false for emails with domain of lenght 2 of numeric", () => {
        expect(emailValidator("ali@ga")).toBe(false)
    })

    test("return true for emails with domain of length 3 of chars", () => {
        expect(emailValidator("ali@gmail")).toBe(true)
    })
})