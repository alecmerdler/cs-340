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
                                           name="username"
                                           md-maxlength="20"
                                           required>
                                        <div ng-messages="$ctrl.newUserForm.username.$error">
                                            <div ng-message="required">This is required.</div>
                                            <div ng-message="md-maxlength">Must not be longer than 20 characters.</div>
                                        </div>
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>First Name</label>
                                    <input ng-model="$ctrl.newUser.firstName"
                                           type="text"
                                           name="firstName"
                                           md-maxlength="20"
                                           required>
                                        <div ng-messages="$ctrl.newUserForm.firstName.$error">
                                            <div ng-message="required">This is required.</div>
                                            <div ng-message="md-maxlength">Must not be longer than 20 characters.</div>
                                        </div>
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>Last Name</label>
                                    <input ng-model="$ctrl.newUser.lastName"
                                           type="text"
                                           name="lastName"
                                           md-maxlength="20"
                                           required>
                                        <div ng-messages="$ctrl.newUserForm.lastName.$error">
                                            <div ng-message="required">This is required.</div>
                                            <div ng-message="md-maxlength">Must not be longer than 20 characters.</div>
                                        </div>
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>Email</label>
                                    <input ng-model="$ctrl.newUser.email"
                                           type="email"
                                           name="email"
                                           required>
                                        <div ng-messages="$ctrl.newUserForm.email.$error">
                                            <div ng-message="required">This is required.</div>
                                            <div ng-message="md-maxlength">Must not be longer than 20 characters.</div>
                                        </div>
                                </md-input-container>
                                
                                <md-input-container>
                                    <label>Age</label>
                                    <input ng-model="$ctrl.newUser.email"
                                           type="number"
                                           name="age">
                                </md-input-container>
                                
                                <md-button class="md-primary"
                                           ng-click="$ctrl.createUser()"
                                           ng-disabled="$ctrl.newUserForm.>
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