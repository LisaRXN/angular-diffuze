import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackDialogComponent } from './pack-dialog.component';

describe('PackDialogComponent', () => {
  let component: PackDialogComponent;
  let fixture: ComponentFixture<PackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
