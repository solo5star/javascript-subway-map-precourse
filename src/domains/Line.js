import AppError from '../errors/AppError.js';
import Station from './Station.js';

export default class Line {
  /** @type {string} */
  #name;

  /** @type {Station[]} */
  #stations = [];

  /**
   * @param {string} name
   * @param {Station[]} stations
   */
  constructor(name, stations) {
    this.#name = name;
    this.#stations = stations;
    this.#validate();
  }

  #validate() {
    if (this.#name.length < 2) {
      throw new AppError('노선 이름은 2글자 이상이어야 합니다.');
    }
    if (this.#stations.length < 2) {
      throw new AppError('노선은 최소 2개 이상의 역을 가져야 합니다.');
    }
  }

  getName() {
    return this.#name;
  }

  /**
   * @param {Station} station
   * @param {number} position
   */
  addStation(station, position) {
    this.#stations.splice(position, 0, station);
  }

  getStations() {
    return this.#stations;
  }

  getFirst() {
    return this.#stations[0];
  }

  getLast() {
    return this.#stations[this.#stations.length - 1];
  }

  /**
   * @param {Station} station
   */
  hasStation(station) {
    return this.#stations.some((other) => other.getName() === station.getName());
  }

  /**
   * @param {Station} station
   */
  removeStation(station) {
    if (this.#stations.some((other) => other.getName() === station.getName())) {
      throw new AppError(`${station.getName()} 역은 이 노선에 존재하지 않습니다.`);
    }
    this.#stations = this.#stations.filter((other) => other.getName() !== station.getName());
  }
}
