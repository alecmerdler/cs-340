import { Component, Inject, OnInit } from 'ng-metadata/core';
import { UserModel, UserInstance } from '../models/user/user.model';
import { MediaModel, MediaInstance } from '../models/media/media.model';
import { RecommendationModel, RecommendationInstance } from '../models/recommendation/recommendation.model';
import template from './app.component.html';


@Component({
    selector: 'app',
    template: template,
})
export class AppComponent implements OnInit {

    public mediaList: MediaInstance[] = [];
    public recommendationsList: RecommendationInstance[] = [];
    public isLoading: boolean = true;
    private readonly mediaLimit: number = 6;

    constructor(@Inject(MediaModel) private mediaModel: MediaModel,
                @Inject(RecommendationModel) private recommendationModel: RecommendationModel) {

    }

    public ngOnInit(): void {
        this.mediaModel.list()
            .then((mediaList) => {
                this.mediaList = mediaList;
                this.isLoading = false;
            });

        this.recommendationModel.list()
            .then((recommendationsList) => {
                this.recommendationsList = recommendationsList;
            });
    }
}
