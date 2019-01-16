export function timePassed(secondsDuration: number):string{
  return Math.ceil(secondsDuration / 1000)+'s前';
}
