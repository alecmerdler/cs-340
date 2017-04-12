import { Component, Inject, OnInit } from 'ng-metadata/core';
import { UserModel, UserInstance } from './models/user/user.model';
import template from './app.component.html';


@Component({
    selector: 'app',
    template: template,
})
export class AppComponent implements OnInit {

    public userList: UserInstance[] = [];
    public newUser: UserInstance;
    public isLoading: boolean = true;
    private newUserForm: ng.IFormController;

    constructor(@Inject(UserModel) private userModel: UserModel) {

    }

    public ngOnInit(): void {
        this.userModel.list()
            .then((userList) => {
                this.userList = userList;
                this.isLoading = false;
            });
    }

    public createUser(): void {
        this.isLoading = true;

        this.userModel.create(this.newUser)
            .then((newUser) => {
                this.newUserForm.$setPristine();
                this.newUser = null;
            })
            .catch((error) => {
                this.newUserForm.username.$setValidity("unique", false);
            })
            .finally(() => {
                return this.userModel.list();
            })
            .then((userList) => {
                this.userList = userList;
                this.isLoading = false;
            });
    }

    public removeUser(user: UserInstance): void {
        this.userModel.destroy(user.username)
            .then(() => {
                return this.userModel.list();
            })
            .then((userList) => {
                this.userList = userList;
                this.isLoading = false;
            });
    }

    public refreshUserList(): void {
        this.isLoading = true;

        this.userModel.list()
            .then((userList) => {
                this.userList = userList;
                this.isLoading = false;
            });
    }
}
