import AppError from '../errors/AppError.js';
import SubwayService from '../services/SubwayService.js';
import Console from '../utils/Console.js';
import View from './View.js';

export default class Context {
  /** @type {SubwayService} */
  #subwayService;

  /** @type {View[]} */
  #viewStack = [];

  /**
   * @param {SubwayService} subwayService
   */
  constructor(subwayService) {
    this.#subwayService = subwayService;
  }

  getSubwayService() {
    return this.#subwayService;
  }

  getViewStack() {
    return this.#viewStack;
  }

  push(view) {
    this.#viewStack.push(view);
  }

  pop() {
    return this.#viewStack.pop() ?? null;
  }

  top() {
    return this.#viewStack[this.#viewStack.length - 1];
  }

  hasBackward() {
    return this.#viewStack.length > 1;
  }

  *run() {
    while (this.#viewStack.length > 0) {
      const view = this.#viewStack.length === 1 ? this.top() : this.pop();

      try {
        yield* view.render(this);
      } catch (error) {
        if (!(error instanceof AppError)) throw error;

        view.print();
        view.print(error.message);
        view.print();
      }
    }
    Console.close();
  }
}
