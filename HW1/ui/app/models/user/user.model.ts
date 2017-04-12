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

    constructor(@Inject('$http') private $http: ng.IHttpService,
                @Inject('$q') private $q: ng.IQService) {

    }

    public create(user: UserInstance): ng.IPromise<UserInstance> {
        return this.$http.post<UserInstance>('/~merdlera/cs340/HW1/api/users.php', user)
            .then((response) => {
                return this.$q.resolve(response.data);
            });
    }

    public list(): ng.IPromise<UserInstance[]> {
        return this.$http.get<UserInstance[]>('/~merdlera/cs340/HW1/api/users.php')
            .then((response) => {
                return this.$q.resolve(response.data);
            });
    }

    public destroy(username: string): ng.IPromise<void> {
        return this.$http.delete<void>(`/~merdlera/cs340/HW1/api/users.php?username=${username}`)
            .then((response) => {
                return this.$q.resolve();
            });
    }
}
