import SubwayService from './services/SubwayService.js';
import runGenerator from './utils/runGenerator.js';
import Context from './views/Context.js';
import { MainMenu } from './views/menus.js';

class App {
  run() {
    const subwayService = new SubwayService();
    const context = new Context(subwayService);

    context.push(MainMenu);
    runGenerator(context.run.bind(context));
  }
}

new App().run();
