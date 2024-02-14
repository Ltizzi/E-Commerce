import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const inAndOutAnimation = trigger('in&Out', [
  state(
    'in',
    style({
      opacity: 1,
      transform: 'translateX(0px)',
    })
  ),
  state(
    'out',
    style({
      opacity: 0,
      transform: 'translateX(-200px)',
    })
  ),
  transition('in<=>out', animate(100)),
]);
