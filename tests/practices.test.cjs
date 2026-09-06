const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createPracticeState, practiceReducer, getBreathingStep, breathingSteps, groundingPractice, parentingPractice } = require("../src/lib/practices.ts");

for (const practice of [groundingPractice, parentingPractice]) {
  test(practice.title + ": complete in any order, undo and repeat", () => {
    let state = createPracticeState(practice.items.length);
    for (let index = practice.items.length - 1; index >= 0; index--) {
      state = practiceReducer(state, { type: "check", index, checked: true });
      assert.equal(state.isOpen, index === 0);
    }
    state = practiceReducer(state, { type: "rate", value: 4 });
    assert.equal(state.rating, 4);
    state = practiceReducer(state, { type: "close" });
    assert.equal(state.isOpen, false);
    assert.equal(state.checked.every(Boolean), true);
    assert.strictEqual(practiceReducer(state, { type: "check", index: 0, checked: true }), state);
    state = practiceReducer(state, { type: "check", index: 0, checked: false });
    assert.equal(state.rating, 0);
    state = practiceReducer(state, { type: "check", index: 0, checked: true });
    assert.equal(state.isOpen, true);
  });
}

test("invalid indices, ratings and duplicate changes are ignored", () => {
  const state = createPracticeState(5);
  for (const index of [-1, 5, 0.5, NaN]) assert.strictEqual(practiceReducer(state, { type: "check", index, checked: true }), state);
  assert.strictEqual(practiceReducer(state, { type: "check", index: 0, checked: false }), state);
  for (const value of [0, 6, 1.5, NaN, 3]) assert.strictEqual(practiceReducer(state, { type: "rate", value }), state);
  for (const count of [0, -1, 1.5, NaN]) assert.throws(() => createPracticeState(count), RangeError);
});

test("checklists do not share progress", () => {
  const original = createPracticeState(5);
  const other = createPracticeState(4);
  const next = practiceReducer(original, { type: "check", index: 0, checked: true });
  assert.equal(next.checked[0], true);
  assert.equal(original.checked[0], false);
  assert.equal(other.checked.some(Boolean), false);
});

test("breathing includes both holds and loops after sixteen seconds", () => {
  assert.deepEqual([0, 3999, 4000, 8000, 12000, 15999, 16000, 20000].map(getBreathingStep), [0, 0, 1, 2, 3, 3, 0, 1]);
  assert.match(breathingSteps[1].alt, /після вдиху/);
  assert.match(breathingSteps[3].alt, /після видиху/);
  assert.deepEqual([-1, NaN, Infinity].map(getBreathingStep), [0, 0, 0]);
});
