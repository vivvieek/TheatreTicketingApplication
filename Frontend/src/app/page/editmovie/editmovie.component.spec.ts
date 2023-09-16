import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmovieComponent } from './editmovie.component';

describe('EditmovieComponent', () => {
  let component: EditmovieComponent;
  let fixture: ComponentFixture<EditmovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditmovieComponent]
    });
    fixture = TestBed.createComponent(EditmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
