import { Injectable, Inject } from 'ng-metadata/core';


export type UserInstance = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
};


@Injectable()
export class UserModel {

    constructor(@Inject('$http') private $http: ng.IHttpService) {

    }

    public create(user: UserInstance): ng.IHttpPromise<UserInstance> {
        return this.$http.post<UserInstance>('/~merdlera/cs340/HW1/backend/api.php/Users', user);
    }

    public list(): ng.IHttpPromise<UserInstance[]> {
        return this.$http.get<UserInstance[]>('/~merdlera/cs340/HW1/backend/api.php/Users');
    }
}
