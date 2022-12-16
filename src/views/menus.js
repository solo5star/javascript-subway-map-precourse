import Line from '../domains/Line.js';
import Station from '../domains/Station.js';
import AppError from '../errors/AppError.js';
import Context from './Context.js';
import MenuView from './MenuView.js';
import View from './View.js';

export const StationMenu = new MenuView('역 관리 화면', [
  new (class extends View {
    /** @param {Context} context */
    *render(context) {
      this.printTitle('등록할 역 이름을 입력하세요.');
      context.getSubwayService().addStation(new Station(yield this.read));
      this.printInfo('지하철 역이 등록되었습니다.');
    }
  })('역 등록'),

  new (class extends View {
    /** @param {Context} context */
    *render(context) {
      this.printTitle('삭제할 역 이름을 입력하세요.');
      context.getSubwayService().deleteStationByName(yield this.read);
      this.printInfo('지하철 역이 삭제되었습니다.');
    }
  })('역 삭제'),

  new (class extends View {
    /** @param {Context} context */
    *render(context) {
      this.printTitle('역 목록');
      context
        .getSubwayService()
        .getStations()
        .forEach((station) => {
          this.printInfo(station.getName());
        });
    }
  })('역 조회'),
]);

export const LineMenu = new MenuView('노선 관리 화면', [
  new (class extends View {
    /** @param {Context} context */
    *render(context) {
      this.printTitle('등록할 노선 이름을 입력하세요.');
      const lineName = yield this.read;

      this.printTitle('등록할 노선의 상행 종점역 이름을 입력하세요.');
      const firstStation = context.getSubwayService().getStation(yield this.read);

      this.printTitle('등록할 노선의 하행 종점역 이름을 입력하세요.');
      const lastStation = context.getSubwayService().getStation(yield this.read);

      context.getSubwayService().addLine(new Line(lineName, [firstStation, lastStation]));
      this.printInfo('지하철 노선이 등록되었습니다.');
    }
  })('노선 등록'),

  new (class extends View {
    /** @param {Context} context */
    *render(context) {
      this.printTitle('삭제할 노선의 이름을 입력하세요.');
      context.getSubwayService().deleteLineByName(yield this.read);
      this.printInfo('지하철 노선이 삭제되었습니다.');
    }
  })('노선 삭제'),

  new (class extends View {
    /** @param {Context} context */
    *render(context) {
      this.printTitle('노선 목록');
      context
        .getSubwayService()
        .getLines()
        .forEach((line) => {
          this.printInfo(line.getName());
        });
    }
  })('노선 조회'),
]);

export const SectionMenu = new MenuView('구간 관리', [
  new (class extends View {
    /** @param {Context} context */
    *render(context) {
      this.printTitle('노선을 입력하세요.');
      const line = context.getSubwayService().getLine(yield this.read);

      this.printTitle('역이름을 입력하세요.');
      const station = context.getSubwayService().getStation(yield this.read);

      this.printTitle('순서를 입력하세요.');
      const position = Number(yield this.read);
      if (Number.isNaN(position)) throw new AppError('숫자를 입력해야 합니다.');

      line.addStation(station, position);
      this.printInfo('구간이 등록되었습니다.');
    }
  })('구간 등록'),

  new (class extends View {
    /** @param {Context} context */
    *render(context) {
      this.printTitle('삭제할 구간의 노선을 입력하세요.');
      const line = context.getSubwayService().getLine(yield this.read);

      this.printTitle('삭제할 구간의 역을 입력하세요.');
      const station = context.getSubwayService().getStation(yield this.read);

      line.removeStation(station);
      this.printInfo('구간이 삭제되었습니다.');
    }
  })('구간 삭제'),
]);

export const MainMenu = new MenuView('메인 화면', [
  StationMenu,
  LineMenu,
  SectionMenu,
  new (class extends View {
    /** @param {Context} context */
    *render(context) {
      this.printTitle('지하철 노선도');
      context
        .getSubwayService()
        .getLines()
        .forEach((line) => {
          this.printInfo(line.getName());
          this.printInfo('---');
          line.getStations().forEach((station) => {
            this.printInfo(station.getName());
          });
        });
    }
  })('지하철 노선도 출력'),
]);
