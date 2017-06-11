import { Injectable, Inject } from 'ng-metadata/core';


export type ReviewAttributes = {
    description?: string;
    numStars?: number;
    mediaID?: number;
    userID?: number;
};


export type ReviewInstance = {
    id: number;
    description: string;
    numStars: number;
    title: string;
    firstName: string;
};


@Injectable()
export class ReviewModel {

    private readonly resourceURL: string = '/~merdlera/cs340/final/api/reviews.php';

    constructor(@Inject('$http') private $http: ng.IHttpService,
                @Inject('$q') private $q: ng.IQService) {

    }

    public create(review: ReviewAttributes): ng.IPromise<ReviewInstance> {
        return this.$http.post<ReviewInstance>(this.resourceURL, review)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }

    public listByUser(userID: number): ng.IPromise<ReviewInstance[]> {
        return this.$http.get<ReviewInstance[]>(`${this.resourceURL}?userID=${userID}`)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }

    public listByMedia(mediaID: number): ng.IPromise<ReviewInstance[]> {
        return this.$http.get<ReviewInstance[]>(`${this.resourceURL}?mediaID=${mediaID}`)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }
}
