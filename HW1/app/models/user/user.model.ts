import { Injectable, Inject } from 'ng-metadata';


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

    public create(username: string,
                  firstName: string,
                  lastName: string,
                  email: string,
                  age?: number): ng.IHttpPromise {
        return this.$http.post<UserInstance>('/~merdlera/cs340/HW1/backend/api.php/Users', user);
    }

    public list(): ng.IHttpPromise {
        return $http.get<UserInstance[]>('/~merdlera/cs340/HW1/backend/api.php/Users');
    }
}
