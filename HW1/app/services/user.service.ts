import { Injectable, Inject } from 'ng-metadata/core';


export type User = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
};


@Injectable()
export function createUser($http: ng.IHttpService, user: User): Promise<User> {
    return $http.post<User>('backend/api.php/Users');
}


@Injectable()
export function retrieveUsers($http: ng.IHttpService): Promise<User[]> {
    return $http.get<User[]>('/backend/api.php/Users');
}
