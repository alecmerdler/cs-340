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
    private newUserForm: ng.IFormController;

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
                this.newUserForm.$setPristine();

                return this.userModel.list();
            })
            .then((userList) => {
                this.userList = userList;
            })
            .catch((error) => {
                this.newUserForm.username.$setValidity("unique", false);
            })
    }
}
