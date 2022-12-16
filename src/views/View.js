import Console from '../utils/Console.js';
import Context from './Context.js';

export default class View {
  /** @type {string} */
  name;

  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * @param {Context} context
   */
  *render(context) {}

  read(callback) {
    Console.readLine('', (text) => callback(text));
  }

  /**
   * @param {string} message
   */
  print(message = '') {
    Console.print(message);
  }

  /**
   * @param {string} title
   */
  printTitle(title) {
    this.print('');
    this.print(`## ${title}`);
  }

  /**
   * @param {string} info
   */
  printInfo(info) {
    this.print(`[INFO] ${info}`);
  }
}
