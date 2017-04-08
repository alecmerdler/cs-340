import { Component, Inject } from 'ng-metadata/core';


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

    constructor(@Inject('$http') private $http: ng.IHttpService) {
        this.$http.get<any>('/backend/api.php/users')
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}