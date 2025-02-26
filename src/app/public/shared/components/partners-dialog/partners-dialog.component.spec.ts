import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersDialogComponent } from './partners-dialog.component';

describe('PartnersDialogComponent', () => {
  let component: PartnersDialogComponent;
  let fixture: ComponentFixture<PartnersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
