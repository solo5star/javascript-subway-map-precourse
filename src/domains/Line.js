import AppError from '../errors/AppError';

export default class Line {
  /** @type {string} */
  #name;

  /**
   * @param {string} name
   */
  constructor(name) {
    this.#name = name;
    this.#validate();
  }

  #validate() {
    if (this.#name.length < 2) {
      throw new AppError('노선 이름은 2글자 이상이어야 합니다.');
    }
  }

  getName() {
    return this.#name;
  }
}
