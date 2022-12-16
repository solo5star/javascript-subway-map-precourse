export default class AppError extends Error {
  static PREFIX = '[ERROR]';

  constructor(message) {
    super(`${AppError.PREFIX} ${message}`);
    this.name = this.constructor.name;
  }
}
