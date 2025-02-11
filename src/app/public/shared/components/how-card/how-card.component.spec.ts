import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowCardComponent } from './how-card.component';

describe('HowCardComponent', () => {
  let component: HowCardComponent;
  let fixture: ComponentFixture<HowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
