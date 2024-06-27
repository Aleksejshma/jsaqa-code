const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
});
describe("Test not sorting", () => {
  it("Books names should be sorted in ascending order1", () => {
    expect(sorting.sortByName(["Гарри Поттер", "Гарри Поттер"])).toEqual([
      "Гарри Поттер",
      "Гарри Поттер",
    ]);
  });
});
