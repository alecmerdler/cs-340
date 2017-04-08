export type User = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
};


export function createUser($http: ng.IHttpService, user: User): ng.IHttpPromise<User> {
    return $http.post<User>('backend/api.php/Users', user);
}


export function retrieveUsers($http: ng.IHttpService): ng.IHttpPromise<User[]> {
    return $http.get<User[]>('/backend/api.php/Users');
}
