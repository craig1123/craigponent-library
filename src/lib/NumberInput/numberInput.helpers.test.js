import { addCommas, limitToScale } from './numberInput.helpers';

describe('Add Commas', () => {
  it('should add a comma every 3 places', () => {
    expect(addCommas('123')).toEqual('123');
    expect(addCommas('1234')).toEqual('1,234');
    expect(addCommas('12345')).toEqual('12,345');
    expect(addCommas('123456789')).toEqual('123,456,789');
    expect(addCommas('1234567890')).toEqual('1,234,567,890');
  });

  it('should limit to only numbers, commas, a decimal point', () => {
    expect(addCommas('1ddr42.l90')).toEqual(null);
    expect(addCommas('')).toEqual('');
  });

  it('should limit the number after decimal to the scale', () => {
    expect(addCommas('123.4567', 3)).toEqual('123.456');
    expect(addCommas('123.4567', 2)).toEqual('123.45');
    expect(addCommas('123.4567', 1)).toEqual('123.4');
    expect(addCommas('123.4567', 0)).toEqual('123');
    expect(addCommas('123.', 0)).toEqual('123');
  });

  it('should only have numbers after decimal', () => {
    expect(addCommas('1.,3')).toEqual('1.3');
  });

  it('converts numbers to strings', () => {
    expect(addCommas(12345)).toEqual('12,345');
  });

  describe('limitToScale', () => {
    it('should limit numbers after decimal to scale', () => {
      expect(limitToScale('45678', 3)).toEqual('456');
      expect(limitToScale('45678', 2)).toEqual('45');
      expect(limitToScale('45678', 1)).toEqual('4');
    });
  });
});
