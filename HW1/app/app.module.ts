import { NgModule } from 'ng-metadata/core';
import { AppComponent } from './app.component';
import * as ngAnimate from 'angular-animate';
import * as ngAria from 'angular-aria';
import * as ngMessages from 'angular-messages';
import ngMaterial from 'angular-material'


@NgModule({
    imports: [
        ngAnimate,
        ngAria,
        ngMessages,
        ngMaterial,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [

    ]
})
export class AppModule {

}
