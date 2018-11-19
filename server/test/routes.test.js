const expect = require("expect");
const request = require("supertest");
const app = require("./../../app");

const {populateSalesOrders} = require("./seed")



beforeEach(populateSalesOrders);

describe("GET /todos", () => {
    it("should get all todos", (done) => {
        request(app)
            .get(`/api/salesorders`)
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(1);
            })
            .end(done)


    });
});