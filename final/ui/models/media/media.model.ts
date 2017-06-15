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

    private readonly resourceURL: string = '/~merdlera/cs340/final/api/media.php';

    constructor(@Inject('$http') private $http: ng.IHttpService,
                @Inject('$q') private $q: ng.IQService) {

    }

    public list(): ng.IPromise<MediaInstance[]> {
        return this.$http.get<MediaInstance[]>(this.resourceURL)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }

    public retrieve(id: number): ng.IPromise<MediaInstance> {
        return this.$http.get<MediaInstance>(`${this.resourceURL}?id=${id}`)
            .then((response) => {
               return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }

    public search(searchTitle: string): ng.IPromise<MediaInstance[]> {
        return this.$http.get<MediaInstance[]>(`${this.resourceURL}?search=${searchTitle}`)
            .then((response) => {
                return this.$q.resolve(response.data);
            })
            .catch((error) => {
                return this.$q.reject(error.data);
            });
    }
}
