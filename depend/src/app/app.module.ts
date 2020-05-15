import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestAService } from './testa.service';
import { TestBService } from './testb.service';
import { SubComponent } from './sub.component';

@NgModule({
  declarations: [
    AppComponent,
    SubComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TestBService,
    { provide: TestAService, useClass: TestAService, deps: [TestBService] } // TestAService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
