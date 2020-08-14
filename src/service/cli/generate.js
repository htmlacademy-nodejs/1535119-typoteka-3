'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const {
  getRandomInt,
  shuffle,
} = require(`../utils`);

const dateToday = () => {
  const today = new Date();
  return today.getFullYear() + `-` + (today.getMonth() + 1) + `-` + today.getDate() + ` ` + today.getHours() + `:` + today.getMinutes() + `:` + today.getSeconds();
};

const generatePosts = (count, sentences, titles, categories) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(1, 5).join(` `),
    createdDate: dateToday(),
    category: [categories[getRandomInt(0, categories.length - 1)]]
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    let msg;
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer <= 1000) {
      const content = JSON.stringify(generatePosts(countOffer, sentences, titles, categories));
      try {
        await fs.writeFile(FILE_NAME, content);
        console.log(chalk.green(`Operation success. File created.`));
      } catch (err) {
        console.error(chalk.red(`Can't write data to file...`));
      }
    } else {
      msg = console.error(chalk.red(`Не больше 1000 публикаций`));
    }
    return msg;
  }
};
