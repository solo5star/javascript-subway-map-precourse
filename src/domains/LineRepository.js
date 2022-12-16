import AppError from '../errors/AppError';
import Line from './Line';

export default class LineRepository {
  /** @type {Line[]} */
  #lines = [];

  getLines() {
    return this.#lines;
  }

  /**
   * @param {Line} line
   */
  addLine(line) {
    if (this.#lines.some((other) => other.getName() === line.getName())) {
      throw new AppError('이미 등록된 노선 이름입니다.');
    }
    this.#lines.push(line);
  }

  /**
   * @param {string} name
   */
  deleteLineByName(name) {
    if (!this.#lines.some((line) => line.getName() === name)) {
      throw new AppError(`${name} 노선은 존재하지 않습니다.`);
    }
    this.#lines = this.#lines.filter((line) => line.getName() === name);
  }
}
