import { Component, Inject, OnInit } from 'ng-metadata/core';
import { UserModel, UserInstance } from './models/user/user.model';


@Component({
    selector: 'app',
    templateUrl: './app.component.html'
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