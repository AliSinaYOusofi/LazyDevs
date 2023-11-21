import { validateImageBeforeSubmit } from "../../functions/imageValidator";


describe("Testing image validator", () => {

    test("return false for empty file", () => {
        expect(validateImageBeforeSubmit()).toBe(false)
    })

    test("return false for invalid file", () => {
        
        const invalidFile = ([''], 'invalidImage.txt', { type: "text/plain"})
        const funcResult = validateImageBeforeSubmit(invalidFile)
        
        expect(funcResult).toBe(false)
    })
})