import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviedataComponent } from './moviedata.component';

describe('MoviedataComponent', () => {
  let component: MoviedataComponent;
  let fixture: ComponentFixture<MoviedataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviedataComponent]
    });
    fixture = TestBed.createComponent(MoviedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
