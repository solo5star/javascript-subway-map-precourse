import Line from '../domains/Line.js';
import LineRepository from '../domains/LineRepository.js';
import Station from '../domains/Station.js';
import StationRepository from '../domains/StationRepository.js';
import AppError from '../errors/AppError.js';

export default class SubwayService {
  /** @type {LineRepository} */
  #lineRepository;

  /** @type {StationRepository} */
  #stationRepository;

  constructor() {
    this.#lineRepository = new LineRepository();
    this.#stationRepository = new StationRepository(this.#lineRepository);
  }

  /**
   * @param {string} name
   */
  getStation(name) {
    const station = this.#stationRepository.getStation(name);
    if (station === null) throw new AppError('존재하지 않는 역입니다.');
    return station;
  }

  getStations() {
    return this.#stationRepository.getStations();
  }

  /**
   * @param {Station} station
   */
  addStation(station) {
    this.#stationRepository.addStation(station);
  }

  /**
   * @param {string} name
   */
  deleteStationByName(name) {
    this.#stationRepository.deleteStationByName(name);
  }

  /**
   * @param {string} name
   */
  getLine(name) {
    const line = this.#lineRepository.getLine(name);
    if (line === null) throw new AppError('존재하지 않는 노선입니다.');
    return line;
  }

  getLines() {
    return this.#lineRepository.getLines();
  }

  /**
   * @param {Line} line
   */
  addLine(line) {
    this.#lineRepository.addLine(line);
  }

  /**
   * @param {string} name
   */
  deleteLineByName(name) {
    this.#lineRepository.deleteLineByName(name);
  }
}
