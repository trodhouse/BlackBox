import bb from "./bb";

it("test initialise", () => {
  const box = new bb();
  console.log(box.aGrid);
  console.log(box.tries);
});
