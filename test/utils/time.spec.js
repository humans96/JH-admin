import should from 'should';
import moment from 'moment';

import { getTimeDesc } from '../../src/utils/time';



describe('utils/time.js', () => {
  describe('#getTimeDesc', () => {

    // incoming string: 2017-07-11 17:24:38.501084
    const now = moment();
    const format = 'YYYY-MM-DD HH:mm:ss.S';

    let _secondsBefore;
    let _1minuteBefore;
    let _35minuteBefore;
    let _moreThan1Hour;
    let _moreThan1Day;
    let _3daysBefore;
    let _moreThan1Month;
    let _moreThan2Month;

    before(() => {
      _secondsBefore = moment().subtract(5, 'second').format(format);
      _1minuteBefore = moment().subtract(1, 'minutes').format(format);
      _35minuteBefore = moment().subtract(35, 'minutes').format(format);
      _moreThan1Hour = moment().subtract(65, 'minutes').format(format);
      _moreThan1Day = moment().subtract(1, 'day').subtract(3, 'hour').format(format);
      _3daysBefore = moment().subtract(3, 'days').subtract(3, 'hour').format(format);
      _moreThan1Month = moment().subtract(1, 'month').subtract(3, 'hour').format(format);
      _moreThan2Month = moment().subtract(2, 'month').subtract(3, 'hour').format(format);
    });

    it('give `seconds before` should be `几秒前`', () => {
      getTimeDesc(_secondsBefore).should.be.exactly('几秒前');
    })
    it('give `1 minutes before` should be `1分钟前`', () => {
      getTimeDesc(_1minuteBefore).should.be.exactly('1分钟前');
    })
    it('give `35 minutes before` should be `35分钟前`', () => {
      getTimeDesc(_35minuteBefore).should.be.exactly('35分钟前');
    })
    it('give `65 minutes before` should be `1小时前`', () => {
      getTimeDesc(_moreThan1Hour).should.be.exactly('1小时前');
    })
    it('give `more than 1 day before` should be `1天前`', () => {
      getTimeDesc(_moreThan1Day).should.be.exactly('1天前');
    })
    it('give `three days before` should be `3天前`', () => {
      getTimeDesc(_3daysBefore).should.be.exactly('3天前');
    })
    it('give `more than 1 month before` should be `1个月前`', () => {
      getTimeDesc(_moreThan1Month).should.be.exactly('1个月前');
    })
    it('give `more than 2 month before` should be `2个月前`', () => {
      getTimeDesc(_moreThan2Month).should.be.exactly('2个月前');
    })
  });

})
