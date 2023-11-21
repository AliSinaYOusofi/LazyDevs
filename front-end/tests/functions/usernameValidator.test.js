import { usernameValidator } from "../../functions/usernameValidator"

describe("User name validator", () => {
    
    test("false for no value", () => {
        expect(usernameValidator()).toBe(false)
    })

    test("false for spaces", () => {
        expect(usernameValidator("   ")).toBe(false)
    })

    test("false for zero length", () => {
        expect(usernameValidator(undefined)).toBe(false)
    })

    test("false for length of 1 of numeric", () => {
        expect(usernameValidator("1")).toBe(false)
    })
    test("true for length of 1 of alphabet", () => {
        expect(usernameValidator("d")).toBe(true)
    })
})