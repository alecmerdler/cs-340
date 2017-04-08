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
                        <md-card-title>
                            <h1>Create New User</h1>
                        </md-card-title>
                        <md-card-content>
                            <div>
                                <md-input-container>
                                    <label>Username</label>
                                    <input ng-model="$ctrl.username">
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>First Name</label>
                                    <input ng-model="$ctrl.firstName">
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>Last Name</label>
                                    <input ng-model="$ctrl.lastName">
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>Email</label>
                                    <input ng-model="$ctrl.email">
                                </md-input-container>
                            </div>
                        </md-card-content>
                    </md-card>
                </div>
                
                <div flex="50">
                    <md-card>
                        <md-card-title>
                            <h1>View All Users</h1>
                        </md-card-title>
                        <md-card-content>
                            <md-list>
                            
                            </md-list>
                        </md-card-content>
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