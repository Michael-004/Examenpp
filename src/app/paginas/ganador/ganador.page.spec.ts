import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanadorPage } from './ganador.page';

describe('GanadorPage', () => {
  let component: GanadorPage;
  let fixture: ComponentFixture<GanadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GanadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
