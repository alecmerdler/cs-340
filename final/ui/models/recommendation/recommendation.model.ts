import { Injectable, Inject } from 'ng-metadata/core';


export type RecommendationAttributes = {
    message: string;
    mediaID: string;
    recommenderID: number;
    recommendedToID: number;
};


export type RecommendationInstance = {
    id: number;
    message: string;
    title: string;
    firstName: string;
};


@Injectable()
export class RecommendationModel {

    private readonly resourceURL: string = '/~merdlera/cs340/final/api/recommendations.php';

    constructor(@Inject('$http') private $http: ng.IHttpService,
                @Inject('$q') private $q: ng.IQService) {

    }

    public create(recommendation: RecommendationAttributes): ng.IPromise<RecommendationInstance> {
        return this.$http.post<RecommendationInstance>(this.resourceURL, recommendation)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }

    public list(userID: number): ng.IPromise<RecommendationInstance[]> {
        return this.$http.get<RecommendationInstance[]>(`${this.resourceURL}?userID=${userID}`)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }
}
