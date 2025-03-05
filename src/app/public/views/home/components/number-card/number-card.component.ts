import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-card',
  imports: [CommonModule],
  templateUrl: './number-card.component.html',
})
export class NumberCardComponent {
  @Input() image: string = '';
  @Input() text: string = '';
  @Input() bg: string = '';
  @Input() startValue: number = 0;
  @Input() endValue: number = 50;
  @Input() duration: number = 1;

  number: number = 0;

  startCount() {
    const animationDuration = this.duration * 1000;
    const frameRate = 30;
    const totalFrames = Math.round(animationDuration / frameRate);

    const increment = (this.endValue - this.startValue) / totalFrames;

    this.number = this.startValue;
    let currentFrame = 0;

    const interval = setInterval(() => {
      currentFrame++;

      this.number = Math.round(this.startValue + increment * currentFrame);

      if (currentFrame >= totalFrames) {
        clearInterval(interval);
        this.number = this.endValue;
      }
    }, 1000 / frameRate);
  }
}
