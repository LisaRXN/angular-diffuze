import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSimulatorComponent } from './option-simulator.component';

describe('OptionSimulatorComponent', () => {
  let component: OptionSimulatorComponent;
  let fixture: ComponentFixture<OptionSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionSimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
