import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidoCocineroPage } from './pedido-cocinero.page';

describe('PedidoCocineroPage', () => {
  let component: PedidoCocineroPage;
  let fixture: ComponentFixture<PedidoCocineroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoCocineroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoCocineroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
