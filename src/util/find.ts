export const find = (text: string, word: string) => {
  // let position: number = -1,
  const temp = text.toLowerCase();
  // const letterArray = word.split("");

  let stringReg = "";
  for (let letter of word.toLowerCase()) {
    stringReg = stringReg + ".*" + letter;
  }

  const req = new RegExp(stringReg);

  // for (let letter of letterArray) {
  //   position = temp.search(letter);
  //   temp = temp.slice(position + 1);
  //   if (position === -1) break;
  // }

  return req.test(temp);
};
