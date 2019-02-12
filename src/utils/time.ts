import * as moment from 'moment'
export function timePassed(secondsDuration: number):string{

  var left = secondsDuration;
  var years = left / (365 * 24 * 60 * 60 * 1000 );
  if(years > 1){
    return Math.floor(years)+' year ago';
  }

  left = left % (365 * 24 * 60 * 60 * 1000 );
  var month = left /  (30 * 24 * 60 * 60 * 1000 );
  if(month > 1){
    return Math.floor(month)+' month ago';
  }
  left = left %  (30 * 24* 60 * 60 * 1000 );
  var day = left / ( 24 * 60 * 60 * 1000 );
  if(day > 1){
    return Math.floor(day)+'d ago';
  }
  left = left %  (24 * 60 * 60 * 1000 );
  var hour = left /   (60 * 60 * 1000 );
  if(hour > 1){
    return Math.floor(hour)+'h ago';
  }
  left = left %   (60 * 60 * 1000 );
  var minute = left /  ( 60 * 1000 );
  if(minute > 1){
    return Math.floor(minute)+'m ago';
  }
  left = left %   (60 * 1000 );
  var second = left /   1000;
  if(second > 1){
    return Math.floor(second)+'s ago';
  }

  return '0 s ago'

}

export function format(timestamp:number,format:string):string{
  return moment(timestamp).format(format);
}
