import {Parser} from '../../../src/parser';

describe('.parse()', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('should return error when number of arguments is not valid', () => {
    // jscs:disable
    /*eslint-disable */
    expect(parser.parse('ACOTH("foo")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse("ACOTH('foo')")).to.deep.equal({error: '#VALUE!', result: null});
    /*eslint-enable */
    // jscs:enable
  });

  it('should return error when used variable is not defined', () => {
    expect(parser.parse('ACOTH(foo)')).to.deep.equal({error: '#NAME?', result: null});
  });

  it('should evaluate formula expression provided in lower case', () => {
    parser.setVariable('foo', [7, 3.5, 3.5, 1, 2]);

    expect(parser.parse('sum(2, 3, Rank.eq(2, foo))')).to.deep.equal({error: null, result: 9});
  });

  it.only('should parse VLOOKUP with athrimetic or logic operator in string', () => {
    expect(parser.parse('VLOOKUP(300,{300,"Dhiraj";400,"Vu & PT";500,"Gerud PT."},2,TRUE())')).to.deep.equal({error: null, result: 'Dhiraj'});
    expect(parser.parse('VLOOKUP(300,{300,"Dhiraj";400,"Vu & - + ( ) \' > < = ! % \ / [] ? PT";500,"Gerud PT."},2,TRUE())')).to.deep.equal({error: null, result: 'Dhiraj'});
  });
});
