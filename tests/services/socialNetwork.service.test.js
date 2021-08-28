require("dotenv").config({ path: ".env.test" });
const assert = require("assert");
const fetchMock = require("fetch-mock");
const { baseUrl } = require("../../utils/props.utils").getProps();
const { get } = require("../../services/socialNetwork.service");

const validTwitterResponse = [
  {
    username: "@GuyEndoreKaiser",
    tweet:
      "If you live to be 100, you should make up some fake reason why, just to mess with people... like claim you ate a pinecone every single day.",
  },
  {
    username: "@mikeleffingwell",
    tweet:
      "STOP TELLING ME YOUR NEWBORN'S WEIGHT AND LENGTH I DON'T KNOW WHAT TO DO WITH THAT INFORMATION.",
  },
];

const validFacebookResponse = [
  {
    name: "Some Friend",
    status:
      "Here's some photos of my holiday. Look how much more fun I'm having than you are!",
  },
  {
    name: "Drama Pig",
    status:
      "I am in a hospital. I will not tell you anything about why I am here.",
  },
];

const validInstagramResponse = [
  { username: "hipster1", picture: "food" },
  { username: "hipster2", picture: "coffee" },
  { username: "hipster3", picture: "coffee" },
  { username: "hipster4", picture: "food" },
  { username: "hipster5", picture: "this one is of a cat" },
];

const invalidResponse = {
  invalid: "response",
};

describe("socialNetwork.service", () => {
  it("should return a valid response if all the social network services provide valid results", async () => {
    fetchMock.get(`${baseUrl}/twitter`, validTwitterResponse);
    fetchMock.get(`${baseUrl}/facebook`, validFacebookResponse);
    fetchMock.get(`${baseUrl}/instagram`, validInstagramResponse);
    const result = await get();
    assert.strictEqual(result.twitter[0], validTwitterResponse[0].tweet);
    assert.strictEqual(result.twitter[1], validTwitterResponse[1].tweet);
    assert.strictEqual(result.facebook[0], validFacebookResponse[0].status);
    assert.strictEqual(result.facebook[1], validFacebookResponse[1].status);
    assert.strictEqual(result.instagram[0], validInstagramResponse[0].picture);
    assert.strictEqual(result.instagram[1], validInstagramResponse[1].picture);
    fetchMock.reset();
  });

  it("should fail if any social network returns an invalid response", async () => {
    fetchMock.get(`${baseUrl}/twitter`, null);
    fetchMock.get(`${baseUrl}/facebook`, validFacebookResponse);
    fetchMock.get(`${baseUrl}/instagram`, null);
    try {
      await get();
    } catch (e) {
      fetchMock.reset();
      assert.ok(true);
      return;
    }
    fetchMock.reset();
    assert.fail();
  });

  it("should fail and immediately exit if any response returns a 403", async () => {
    fetchMock.get(`${baseUrl}/twitter`, 403);
    fetchMock.get(`${baseUrl}/facebook`, validFacebookResponse);
    fetchMock.get(`${baseUrl}/instagram`, validInstagramResponse);
    try {
      await get();
    } catch (e) {
      fetchMock.reset();
      assert.strictEqual(e.code, 403);
      return;
    }
    fetchMock.reset();
    assert.fail();
  });

  it("should fail if any response from the services are either a non valid json or a json that does not comply with the required schema", async () => {
    fetchMock.get(`${baseUrl}/twitter`, invalidResponse);
    fetchMock.get(`${baseUrl}/facebook`, validFacebookResponse);
    fetchMock.get(`${baseUrl}/instagram`, invalidResponse);
    try {
      await get();
    } catch (e) {
      fetchMock.reset();
      assert.ok(true);
      return;
    }
    fetchMock.reset();
    assert.fail();
  });
});
