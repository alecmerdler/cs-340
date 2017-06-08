import { Component, Inject, OnInit } from 'ng-metadata/core';
import { UserModel, UserInstance } from '../models/user/user.model';
import { MediaModel, MediaInstance } from '../models/media/media.model';
import { RecommendationModel, RecommendationInstance, RecommendationAttributes } from '../models/recommendation/recommendation.model';
import template from './app.component.html';
import './app.component.css';


@Component({
    selector: 'app',
    template: template,
})
export class AppComponent implements OnInit {

    public currentUser: UserInstance;
    public mediaList: MediaInstance[] = [];
    public recommendationsList: RecommendationInstance[] = [];
    public userList: UserInstance[] = [];
    public isLoading: boolean = true;
    public currentView: string = 'list';
    public loginData: {username: string, password: string};
    public signupData: UserInstance;

    private newRecommendation: RecommendationAttributes;
    private readonly mediaLimit: number = 6;

    constructor(@Inject(MediaModel) private mediaModel: MediaModel,
                @Inject(UserModel) private userModel: UserModel,
                @Inject(RecommendationModel) private recommendationModel: RecommendationModel) {

    }

    public ngOnInit(): void {
        this.userModel.list()
            .then((userList) => {
                this.userList = userList;
            });

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

    public createRecommendation(): void {
        // FIXME
        // this.newRecommendation.recommenderID = this.currentUser.id;
        this.newRecommendation.recommenderID = 1;
        this.recommendationModel.create(this.newRecommendation)
            .then((response) => {
                this.newRecommendation = null;
            });
    }

    public refreshMediaList(): void {
        this.isLoading = true;

        this.mediaModel.list()
            .then((mediaList) => {
                this.mediaList = mediaList;
                this.isLoading = false;
            });
    }

    public recommendMedia(media: MediaInstance): void {

    }

    public reviewMedia(media: MediaInstance): void {

    }

    public login(): void {
        this.isLoading = true;

        this.userModel.authenticateUser(this.loginData.username, this.loginData.password)
            .then((user: UserInstance) => {
                console.log(user);
                this.isLoading = false;
            });
    }

    public signup(): void {
        console.log(this.signup);
    }

    private tileClass(index: number): string {
        const colors: string[] = ['grey', 'green', 'yellow', 'blue', 'purple', 'red'];

        return colors[index % colors.length];
    }
}
