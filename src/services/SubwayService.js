import Line from '../domains/Line';
import LineRepository from '../domains/LineRepository';
import Station from '../domains/Station';
import StationRepository from '../domains/StationRepository';

export class SubwayService {
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
    return this.#stationRepository.getStation(name);
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
    return this.#lineRepository.getLine(name);
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

  /**
   * @param {Station} station
   */
  getLinesOfStation(station) {
    return this.#lineRepository.getLinesOfStation(station);
  }
}
