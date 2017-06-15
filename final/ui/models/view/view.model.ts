import { Injectable, Inject } from 'ng-metadata/core';


export type ViewAttributes = {
    mediaID?: number;
    userID?: number;
};


export type ViewInstance = {
    id: number;
    title: string;
    firstName: string;
    timestamp: number;
    userID: number;
    mediaID: number;
};


@Injectable()
export class ViewModel {

    private readonly resourceURL: string = '/~merdlera/cs340/final/api/views.php';

    constructor(@Inject('$http') private $http: ng.IHttpService,
                @Inject('$q') private $q: ng.IQService) {

    }

    public create(review: ViewAttributes): ng.IPromise<ViewInstance> {
        return this.$http.post<ViewInstance>(this.resourceURL, review)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }

    public listByUser(userID: number): ng.IPromise<ViewInstance[]> {
        return this.$http.get<ViewInstance[]>(`${this.resourceURL}?userID=${userID}`)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }

    public listByMedia(mediaID: number): ng.IPromise<ViewInstance[]> {
        return this.$http.get<ViewInstance[]>(`${this.resourceURL}?mediaID=${mediaID}`)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }
}
