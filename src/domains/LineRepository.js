import AppError from '../errors/AppError';
import Line from './Line';
import Station from './Station';

export default class LineRepository {
  /** @type {Line[]} */
  #lines = [];

  /**
   * @param {string} name
   */
  getLine(name) {
    return this.#lines.find((line) => line.getName() === name) ?? null;
  }

  getLines() {
    return this.#lines;
  }

  /**
   * @param {Station} station
   */
  getLinesOfStation(station) {
    return this.#lines.filter((line) => line.hasStation(station));
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
    this.#lines = this.#lines.filter((line) => line.getName() !== name);
  }
}
