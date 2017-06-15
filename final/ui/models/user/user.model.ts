import { Injectable, Inject } from 'ng-metadata/core';


export type UserInstance = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
};


@Injectable()
export class UserModel {

    private readonly resourceURL: string = '/~merdlera/cs340/final/api/users.php';

    constructor(@Inject('$http') private $http: ng.IHttpService,
                @Inject('$q') private $q: ng.IQService) {

    }

    public create(user: UserInstance): ng.IPromise<UserInstance> {
        return this.$http.post<UserInstance>(this.resourceURL, user)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data['error']);
            });
    }

    public list(): ng.IPromise<UserInstance[]> {
        return this.$http.get<UserInstance[]>(this.resourceURL)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data['error']);
            });
    }

    public destroy(username: string): ng.IPromise<void> {
        return this.$http.delete<void>(`${this.resourceURL}?username=${username}`)
            .then((response) => {
                return this.$q.resolve();
            })
            .catch((error) => {
                return this.$q.reject(error.data['error']);
            });
    }

    public authenticateUser(username: string, password: string): ng.IPromise<UserInstance> {
        const credentials = {username: username, password: password};

        return this.$http.post(`/~merdlera/cs340/final/api/authenticate.php`, credentials)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data['error']);
            });
    }
}
