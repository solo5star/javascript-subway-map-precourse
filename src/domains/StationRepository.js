import AppError from '../errors/AppError.js';
import LineRepository from './LineRepository.js';
import Station from './Station.js';

export default class StationRepository {
  /** @type {LineRepository} */
  #lineRepository;

  /** @type {Station[]} */
  #stations = [];

  /**
   * @param {LineRepository} lineRepository
   */
  constructor(lineRepository) {
    this.#lineRepository = lineRepository;
  }

  /**
   * @param {string} name
   */
  getStation(name) {
    return this.#stations.find((station) => station.getName() === name) ?? null;
  }

  getStations() {
    return this.#stations;
  }

  /**
   * @param {Station} station
   */
  addStation(station) {
    if (this.#stations.some((other) => other.getName() === station.getName())) {
      throw new AppError('이미 등록된 역 이름입니다.');
    }
    this.#stations.push(station);
  }

  /**
   * @param {string} name
   */
  deleteStationByName(name) {
    if (!this.#stations.some((station) => station.getName() === name)) {
      throw new AppError(`${name} 역은 존재하지 않습니다.`);
    }
    if (this.#lineRepository.getLinesOfStation().length > 0) {
      throw new AppError(`${name} 역은 노선에 등록되어 있어 삭제할 수 없습니다.`);
    }
    this.#stations = this.#stations.filter((station) => station.getName() !== name);
  }
}
