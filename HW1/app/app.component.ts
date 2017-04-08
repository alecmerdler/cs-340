import { Component, Inject, OnInit } from 'ng-metadata/core';
import { UserModel, UserInstance } from './models/user/user.model';


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
                                
                                <md-button class="md-primary"
                                           ng-click="$ctrl.createUser()">
                                    Sign Up
                                </md-button>
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
                                <md-list-item ng-repeat="user in $ctrl.userList">
                                
                                </md-list-item>
                            </md-list>
                        </md-card-content>
                    </md-card>
                </div>
            </div>
        </md-content>
    `,
})
export class AppComponent implements OnInit {

    public userList: UserInstance[] = [];
    public newUser: UserInstance;

    constructor(@Inject(UserModel) private userModel: UserModel) {

    }

    public ngOnInit(): void {
        this.userModel.list()
            .then((userList) => {
                console.log(userList);
                this.userList = userList;
            });
    }

    public createUser(): void {
        this.userModel.create(this.newUser)
            .then((newUser) => {
                console.log(newUser);
            });
    }
}