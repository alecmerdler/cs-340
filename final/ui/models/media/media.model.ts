import { Injectable, Inject } from 'ng-metadata/core';


export type MediaInstance = {
    id: number;
    title: string;
    type: string;
    releaseYear: number;
    description: string;
    rating: string;
};


@Injectable()
export class MediaModel {

    constructor(@Inject('$http') private $http: ng.IHttpService,
                @Inject('$q') private $q: ng.IQService) {

    }

    public list(): ng.IPromise<MediaInstance[]> {
        return this.$http.get<MediaInstance[]>('/~merdlera/cs340/HW1/api/media.php')
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }

    public retrieve(id: number): ng.IPromise<MediaInstance> {
        return this.$http.get<MediaInstance>(`/~merdlera/cs340/HW1/api/media.php?id=${id}`)
            .then((response) => {
               return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }
}
