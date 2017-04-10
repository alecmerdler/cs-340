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
                            <span class="md-headline">Create New User</span>
                        </md-card-title>
                        <md-card-content>
                            <form name="newUserForm">
                                <md-input-container>
                                    <label>Username</label>
                                    <input ng-model="$ctrl.newUser.username"
                                           type="text"
                                           md-maxlength="20"
                                           required>
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>First Name</label>
                                    <input ng-model="$ctrl.newUser.firstName"
                                           type="text"
                                           md-maxlength="20"
                                           required>
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>Last Name</label>
                                    <input ng-model="$ctrl.newUser.lastName"
                                           type="text"
                                           md-maxlength="20"
                                           required>
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>Email</label>
                                    <input ng-model="$ctrl.newUser.email"
                                           type="email"
                                           required>
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>Age</label>
                                    <input ng-model="$ctrl.newUser.email"
                                           type="number">
                                </md-input-container>
                                
                                <md-button class="md-primary"
                                           ng-click="$ctrl.createUser()">
                                    Sign Up
                                </md-button>
                            </form>
                        </md-card-content>
                    </md-card>
                </div>
                
                <div flex="50">
                    <md-card>
                        <md-card-title>
                            <span class="md-headline">View All Users</span>
                        </md-card-title>
                        <md-card-content>
                            <md-list>
                                <md-list-item class="md-3-line"
                                              ng-repeat="user in $ctrl.userList"
                                              ng-click="null">
                                    <div class="md-list-item-text" layout="column">
                                        <h3>{{ user.username}}</h3>
                                        <h4>{{ user.email }}</h4>
                                        <p>{{ user.firstName }}</p>
                                    </div>                                    
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
                this.userList = userList;
            });
    }

    public createUser(): void {
        this.userModel.create(this.newUser)
            .then((newUser) => {
                this.newUser = null;

                return this.userModel.list();
            })
            .then((userList) => {
                this.userList = userList;
            });
    }
}