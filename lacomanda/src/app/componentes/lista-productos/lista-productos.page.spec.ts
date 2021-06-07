import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaProductosPage } from './lista-productos.page';

describe('ListaProductosPage', () => {
  let component: ListaProductosPage;
  let fixture: ComponentFixture<ListaProductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProductosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
