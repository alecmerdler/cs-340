import { Component, Inject, OnInit } from 'ng-metadata/core';
import { UserModel, UserInstance } from './models/user/user.model';


@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
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

    public removeUser(user: UserInstance): void {
        this.userModel.destroy(user.username)
            .then(() => {
                return this.userModel.list();
            })
            .then((userList) => {
                this.userList = userList;
            });
    }
}
