import { Component, Inject, Output, EventEmitter } from 'ng-metadata/core';
import { UserModel, UserInstance } from '../../models/user/user.model';
import template from './login.component.html';


@Component({
    selector: 'login',
    template: template,
})
export class LoginComponent {

    @Output() public loginSuccess: EventEmitter<UserInstance> = new EventEmitter();
    @Output() public signupSuccess: EventEmitter<UserInstance> = new EventEmitter();

    public currentUser: UserInstance;
    public isLoading: boolean = false;
    public loginData: {username: string, password: string};
    public signupData: UserInstance;

    private loginAttempts: number = 0;

    constructor(@Inject(UserModel) private userModel: UserModel) {

    }

    public login(): void {
        this.isLoading = true;

        this.userModel.authenticateUser(this.loginData.username, this.loginData.password)
            .then((user: UserInstance) => {
                this.currentUser = user;
                window.sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.isLoading = false;
                this.loginAttempts = 0;
                this.loginSuccess.emit(user);
            })
            .catch((error) => {
                this.isLoading = false;
                this.loginAttempts++;
            });
    }

    public signup(): void {
        this.isLoading = true;
        this.userModel.create(this.signupData)
            .then((newUser: UserInstance) => {
                this.currentUser = newUser;
                window.sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.isLoading = false;
                this.signupSuccess.emit(newUser);
            })
            .catch((error) => {
                this.isLoading = false;
            });
    }
}
