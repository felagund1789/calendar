/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
Date.prototype.getISOWeek = function() {
  // Copy date so don't modify original
  let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks to nearest Thursday
  let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  // Return week number
  return weekNo;
};
// /**
//  * Returns the week number for this date.  dowOffset is the day of week the week
//  * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
//  * the week returned is the ISO 8601 week number.
//  * @param int dowOffset
//  * @return int
//  */
// Date.prototype.getWeek = function (dowOffset) {
//   /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.epoch-calendar.com */

//   dowOffset = typeof (dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
//   var newYear = new Date(this.getFullYear(), 0, 1);
//   var day = newYear.getDay() - dowOffset; //the day of week the year begins on
//   day = (day >= 0 ? day : day + 7);
//   var daynum = Math.floor((this.getTime() - newYear.getTime() -
//     (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
//   var weeknum;
//   //if the year starts before the middle of a week
//   if (day < 4) {
//     weeknum = Math.floor((daynum + day - 1) / 7) + 1;
//     if (weeknum > 52) {
//       nYear = new Date(this.getFullYear() + 1, 0, 1);
//       var nday = nYear.getDay() - dowOffset;
//       nday = nday >= 0 ? nday : nday + 7;
//       /*if the next year starts before the middle of
//           the week, it is week #1 of that year*/
//       weeknum = nday < 4 ? 1 : 53;
//     }
//   }
//   else {
//     weeknum = Math.floor((daynum + day - 1) / 7);
//   }
//   return weeknum;
// };