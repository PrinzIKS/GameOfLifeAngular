import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Game Of Life'`, () => {
    expect(app.title).toEqual('Game Of Life');
  });

  it(`should have as maxRounds 10'`, () => {
    expect(app.maxRounds).toEqual(10);
  });

  it(`should have as live  true after start'`, () => {
    expect(app.live).toEqual(false);
    app.start();
    expect(app.live).toEqual(true);
  });

  it(`centered dead cell should remain dead if no neighbour'`, () => {
    app.field = [[false, false, false], [false, false, false], [false, false, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(false);
  });

  it(`centered alive cell should die if no neighbour'`, () => {
    app.field = [[false, false, false], [false, true, false], [false, false, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(false);
  });

  it(`centered alive cell should die if one neighbour'`, () => {
    app.field = [[false, true, false], [false, true, false], [false, false, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(false);
  });

  it(`centered alive cell should live if two neighbours'`, () => {
    app.field = [[false, true, false], [false, true, false], [false, true, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(true);
  });

  it(`centered alive cell should live if two neighbours 2'`, () => {
    app.field = [[true, true, false], [false, true, false], [false, false, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(true);
  });

  it(`centered dead cell should remain dead if two neighbours'`, () => {
    app.field = [[true, true, false], [false, false, false], [false, false, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(false);
  });

  it(`centered alive cell should live if three neighbours'`, () => {
    app.field = [[true, true, true], [false, true, false], [false, false, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(true);
  });

  it(`centered dead cell should live if three neighbours'`, () => {
    app.field = [[true, true, true], [false, false, false], [false, false, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(true);
  });

  it(`centered alive cell should die if four neighbours'`, () => {
    app.field = [[true, true, true], [false, true, false], [false, true, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(false);
  });

  it(`centered alive cell should die if eight neighbours'`, () => {
    app.field = [[true, true, true], [true, true, true], [true, true, true]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(false);
  });

  it(`centered dead cell should die if four neighbours'`, () => {
    app.field = [[true, true, true], [false, false, false], [false, true, false]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(false);
  });

  it(`centered dead cell should remain dead if eight neighbours'`, () => {
    app.field = [
      [true, true, true],
      [true, false, true],
      [true, true, true]];
    app.nextGeneration();
    expect(app.field[1][1]).toEqual(false);
  });

  it(`?'`, () => {
    app.field = [[false, true, false], [false, true, false], [false, false, false]];
    app.nextGeneration();
    expect(app.field[0][1]).toEqual(false);
    expect(app.field[1][1]).toEqual(false);
  });

});
