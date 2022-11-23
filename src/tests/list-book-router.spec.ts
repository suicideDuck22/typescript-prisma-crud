import app from "../app";
import request from "supertest";

describe("GET /list-books", () => {
    it("Return status code 200", async () => {
        const response = await request(app)
            .get("/books/list-books")
        
        expect(response.statusCode).toEqual(200);
    })
})