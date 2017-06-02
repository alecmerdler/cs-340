import { Injectable, Inject } from 'ng-metadata/core';


export type RecommendationInstance = {
    id: number;
    message: string;
    mediaID: number;
    recommmenderID: number;
    recommendedToID: number;
};


@Injectable()
export class RecommendationModel {

    constructor(@Inject('$http') private $http: ng.IHttpService,
                @Inject('$q') private $q: ng.IQService) {

    }

    public create(recommendation: RecommendationInstance): ng.IPromise<RecommendationInstance> {
        return this.$http.post<RecommendationInstance>('/~merdlera/cs340/final/api/recommendations.php', recommendation)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }

    public list(): ng.IPromise<RecommendationInstance[]> {
        return this.$http.get<RecommendationInstance[]>('/~merdlera/cs340/final/api/recommendations.php')
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }
}
