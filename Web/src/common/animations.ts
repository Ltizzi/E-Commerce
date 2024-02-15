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
  transition('in<=>out', animate(150)),
]);

export const hoverInAndOutAnimationNav = trigger('hover&leave', [
  state(
    'hover',
    style({
      // transform: 'scale(1.1)',
      backgroundColor: '#818cf8',
      color: 'white',
      borderRadius: '0.7rem',
      padding: '0.5rem 0.7rem',
      opacity: 0.9,
    })
  ),
  state('leave', style({ transform: 'scale(1)' })),
  transition('hover<=>leave', animate(150)),
]);

export const hoverInAndOutAnimation = trigger('hover&leave', [
  state(
    'hover',
    style({
      // transform: 'scale(1.1)',
      transform: 'scale(1.1)',
    })
  ),
  state('leave', style({ transform: 'scale(1)' })),
  transition('hover<=>leave', animate(150)),
]);

export const fadeIndAndFadeOutAnimation = trigger('fadeIn&Out', [
  state(
    'in',
    style({
      opacity: 1,
      transform: 'scale(1)',
    })
  ),
  state('out', style({ opacity: 0, transform: 'scale(0.75)' })),
  transition('in<=>out', animate(200)),
]);
