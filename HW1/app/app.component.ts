import { Component } from 'ng-metadata/core';


@Component({
    selector: 'app',
    template: `
        <md-content>
            <md-toolbar class="md-hue-2">
                <h2 class="md-toolbar-tools"><span>CS340 Assignment #1</span></h2>
            </md-toolbar>
            
            <div layout="row">
                <div flex="50">
                    <md-card>
                
                    </md-card>
                </div>
                
                <div flex="50">
                    <md-card>
                
                    </md-card>
                </div>
            </div>
        </md-content>
    `,
})
export class AppComponent {

    constructor() {

    }
}