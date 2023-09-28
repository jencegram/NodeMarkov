const MarkovMachine = require('./markov');

describe("Testing chain formation", () => {
  test("Should correctly build chains for 'the cat in the hat'", () => {
    let mm = new MarkovMachine("the cat in the hat");
    expect(mm.chains).toEqual({
      "the": ["cat", "hat"],
      "cat": ["in"],
      "in": ["the"],
      "hat": [null]
    });
  });
});

describe("Testing text generation", () => {
  test("Should generate text within a reasonable range of the specified number of words", () => {
    let mm = new MarkovMachine("the cat in the hat is in the house");
    let text = mm.makeText(5);
    let wordCount = text.split(" ").length;
    expect(wordCount).toBeGreaterThanOrEqual(3);
    expect(wordCount).toBeLessThanOrEqual(7);
  });
});


describe("Testing output validity", () => {
  test("All words in the generated text should be in the input", () => {
    let input = "the cat in the hat";
    let mm = new MarkovMachine(input);
    let text = mm.makeText(10);
    let words = text.split(" ");
    words.forEach(word => {
      expect(input).toContain(word);
    });
  });
});
