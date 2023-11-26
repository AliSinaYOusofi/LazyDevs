const e = require("express")

describe( " getting latest blogs for  /recent",  () => {

    jest.setTimeout(10000)
    let host = 'http://localhost:3001'
    const post_id = "652a6468c82238785e64fef0"

    it ("should return message: invalid cookies if no cookie is provided", async () => {
        
        let data = await fetch(`${host}/blogRoutes/recent?post_id=${post_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        let json = await data.json()
        expect(json.message).toEqual('invalid cookies')
    })

    it ("should return : invalid for invalid mongoID", async () => {
        
        let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhhMDY3MTMzNmNiNmRmNjM0ZjVlNTciLCJ1c2VybmFtZSI6IkFsaSBTaW5hIiwiZnVsbE5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInByb2ZpbGVVcmwiOiJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi80MjAyLzQyMDI4MzEucG5nIiwiYmlvIjoiUGFzc2lvbmF0ZSBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIGEgZmxhaXIgZm9yIHByb2JsZW0tc29sdmluZyBhbmQgYSBkZWRpY2F0aW9uIHRvIGNyYWZ0aW5nIGVmZmljaWVudCBhbmQgc2NhbGFibGUgc29sdXRpb25zLiBFeHBlcmllbmNlZCBpbiBmdWxsLXN0YWNrIGRldmVsb3BtZW50LCBJIHRocml2ZSBvbiB0cmFuc2Zvcm1pbmcgaW5ub3ZhdGl2ZSBpZGVhcyBpbnRvIHJvYnVzdCwgdXNlci1jZW50cmljIGFwcGxpY2F0aW9ucy4iLCJlZHVjYXRpb24iOiJHcmFkdWF0ZSIsIndvcmsiOiJwcm9ncmFtbWluZyIsInNvY2lhbHMiOltdLCJwZXJzb25hbFdlYnNpdGUiOm51bGwsImpvaW5lZCI6IjIwMjMtMDYtMTRUMTg6MjY6NTcuNTk4WiIsIl9fdiI6MCwiaWF0IjoxNzAwOTQ2NjI0LCJleHAiOjE3MDEwMzMwMjR9.wqz6K85MwWJ7_r01IfAJmsldUO7XE1bzNBGDGKURbbU'
        let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhhMDY3MTMzNmNiNmRmNjM0ZjVlNTciLCJ1c2VybmFtZSI6IkFsaSBTaW5hIiwiZnVsbE5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInByb2ZpbGVVcmwiOiJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi80MjAyLzQyMDI4MzEucG5nIiwiYmlvIjoiUGFzc2lvbmF0ZSBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIGEgZmxhaXIgZm9yIHByb2JsZW0tc29sdmluZyBhbmQgYSBkZWRpY2F0aW9uIHRvIGNyYWZ0aW5nIGVmZmljaWVudCBhbmQgc2NhbGFibGUgc29sdXRpb25zLiBFeHBlcmllbmNlZCBpbiBmdWxsLXN0YWNrIGRldmVsb3BtZW50LCBJIHRocml2ZSBvbiB0cmFuc2Zvcm1pbmcgaW5ub3ZhdGl2ZSBpZGVhcyBpbnRvIHJvYnVzdCwgdXNlci1jZW50cmljIGFwcGxpY2F0aW9ucy4iLCJlZHVjYXRpb24iOiJHcmFkdWF0ZSIsIndvcmsiOiJwcm9ncmFtbWluZyIsInNvY2lhbHMiOltdLCJwZXJzb25hbFdlYnNpdGUiOm51bGwsImpvaW5lZCI6IjIwMjMtMDYtMTRUMTg6MjY6NTcuNTk4WiIsIl9fdiI6MCwiaWF0IjoxNzAwODU2MzE1LCJleHAiOjE3MDEwMjkxMTV9.aPIwDXDkckPkHT2C9vqROpYWX2V205nIwRRMF3ckaJ4'
        
        let data = await fetch(`${host}/blogRoutes/recent?post_id=asdfasdfds`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken}`
            }
        })
        
        let json = await data.json()
        expect(json.message).toEqual('invalid post_id')
    })

    it ("should return array of objects of length 4 for valid cookie and post_id", async () => {
        
        let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhhMDY3MTMzNmNiNmRmNjM0ZjVlNTciLCJ1c2VybmFtZSI6IkFsaSBTaW5hIiwiZnVsbE5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInByb2ZpbGVVcmwiOiJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi80MjAyLzQyMDI4MzEucG5nIiwiYmlvIjoiUGFzc2lvbmF0ZSBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIGEgZmxhaXIgZm9yIHByb2JsZW0tc29sdmluZyBhbmQgYSBkZWRpY2F0aW9uIHRvIGNyYWZ0aW5nIGVmZmljaWVudCBhbmQgc2NhbGFibGUgc29sdXRpb25zLiBFeHBlcmllbmNlZCBpbiBmdWxsLXN0YWNrIGRldmVsb3BtZW50LCBJIHRocml2ZSBvbiB0cmFuc2Zvcm1pbmcgaW5ub3ZhdGl2ZSBpZGVhcyBpbnRvIHJvYnVzdCwgdXNlci1jZW50cmljIGFwcGxpY2F0aW9ucy4iLCJlZHVjYXRpb24iOiJHcmFkdWF0ZSIsIndvcmsiOiJwcm9ncmFtbWluZyIsInNvY2lhbHMiOltdLCJwZXJzb25hbFdlYnNpdGUiOm51bGwsImpvaW5lZCI6IjIwMjMtMDYtMTRUMTg6MjY6NTcuNTk4WiIsIl9fdiI6MCwiaWF0IjoxNzAwOTQ2NjI0LCJleHAiOjE3MDEwMzMwMjR9.wqz6K85MwWJ7_r01IfAJmsldUO7XE1bzNBGDGKURbbU'
        let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhhMDY3MTMzNmNiNmRmNjM0ZjVlNTciLCJ1c2VybmFtZSI6IkFsaSBTaW5hIiwiZnVsbE5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInByb2ZpbGVVcmwiOiJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi80MjAyLzQyMDI4MzEucG5nIiwiYmlvIjoiUGFzc2lvbmF0ZSBzb2Z0d2FyZSBlbmdpbmVlciB3aXRoIGEgZmxhaXIgZm9yIHByb2JsZW0tc29sdmluZyBhbmQgYSBkZWRpY2F0aW9uIHRvIGNyYWZ0aW5nIGVmZmljaWVudCBhbmQgc2NhbGFibGUgc29sdXRpb25zLiBFeHBlcmllbmNlZCBpbiBmdWxsLXN0YWNrIGRldmVsb3BtZW50LCBJIHRocml2ZSBvbiB0cmFuc2Zvcm1pbmcgaW5ub3ZhdGl2ZSBpZGVhcyBpbnRvIHJvYnVzdCwgdXNlci1jZW50cmljIGFwcGxpY2F0aW9ucy4iLCJlZHVjYXRpb24iOiJHcmFkdWF0ZSIsIndvcmsiOiJwcm9ncmFtbWluZyIsInNvY2lhbHMiOltdLCJwZXJzb25hbFdlYnNpdGUiOm51bGwsImpvaW5lZCI6IjIwMjMtMDYtMTRUMTg6MjY6NTcuNTk4WiIsIl9fdiI6MCwiaWF0IjoxNzAwODU2MzE1LCJleHAiOjE3MDEwMjkxMTV9.aPIwDXDkckPkHT2C9vqROpYWX2V205nIwRRMF3ckaJ4'
        
        let data = await fetch(`${host}/blogRoutes/recent?post_id=65610a2fbc5598b0af97bfb5`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Cookie": `accessToken=${accessToken}; refreshToken=${refreshToken}`
            }
        })
        
        let json = await data.json()
        expect(json.data).toBeDefined()
        expect(json.status).toEqual('success')
        expect(json.data[0]).toBeDefined()
        expect(json.data[1]).toBeDefined()
        expect(json.data[2]).toBeDefined()
        expect(json.data[3]).toBeDefined()
        expect(json.data.length).toEqual(4)
    })

})