import AppError from '../errors/AppError.js';
import Context from './Context.js';
import View from './View.js';

export default class MenuView extends View {
  /** @type {View[]} */
  #menuItems = [];

  /**
   * @param {string} name
   * @param {View[]} menuItems
   */
  constructor(name, menuItems = []) {
    super(name);
    this.#menuItems = menuItems;
  }

  /**
   * @param {Context} context
   */
  *render(context) {
    this.printTitle(this.name);
    this.#menuItems.forEach((menuItem, index) => {
      this.print(`${index + 1}. ${menuItem.name}`);
    });
    this.print(context.hasBackward() ? 'B. 돌아가기' : 'Q. 종료');

    this.printTitle('원하는 기능을 선택하세요.');
    const selectedMenuItem = yield this.read;
    this.renderMenuItem(context, selectedMenuItem);
    this.print('');
  }

  /**
   * @param {Context} context
   * @param {string} selectedMenuItem
   */
  renderMenuItem(context, selectedMenuItem) {
    if (
      (context.hasBackward() && selectedMenuItem === 'B') ||
      (!context.hasBackward() && selectedMenuItem === 'Q')
    ) {
      context.pop();
      return;
    }
    const menuItem = this.#menuItems[Number(selectedMenuItem) - 1];
    if (!menuItem) {
      throw new AppError('선택할 수 없는 기능입니다.');
    }
    context.push(menuItem);
  }
}
