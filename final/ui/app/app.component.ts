import { Component, Inject, OnInit } from 'ng-metadata/core';
import { UserModel, UserInstance } from '../models/user/user.model';
import { MediaModel, MediaInstance } from '../models/media/media.model';
import { RecommendationModel, RecommendationInstance, RecommendationAttributes } from '../models/recommendation/recommendation.model';
import template from './app.component.html';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
    public currentView: BehaviorSubject<string>;
    public loginData: {username: string, password: string};
    public signupData: UserInstance;

    private newRecommendation: RecommendationAttributes;
    private readonly mediaLimit: number = 6;
    private loginAttempts: number = 0;

    constructor(@Inject(MediaModel) private mediaModel: MediaModel,
                @Inject(UserModel) private userModel: UserModel,
                @Inject(RecommendationModel) private recommendationModel: RecommendationModel) {
        this.currentView = new BehaviorSubject(window.sessionStorage.getItem("currentView") || 'list');
        this.currentView.subscribe((view) => window.sessionStorage.setItem('currentView', view));
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
                this.currentUser = user;
                this.isLoading = false;
                this.loginAttempts = 0;
                this.currentView.next('list');
            })
            .catch((error) => {
                this.isLoading = false;
                this.loginAttempts++;
            });
    }

    public signup(): void {
        this.isLoading = true;
        this.userModel.create(this.signupData)
            .then((newUser: UserInstance) => {
                console.log(newUser);
                this.isLoading = false;
            })
            .catch((error) => {
                this.isLoading = false;
            });
    }

    public logout(): void {
        this.currentView.next('login');
        this.currentUser = null;
    }

    private tileClass(index: number): string {
        const colors: string[] = ['grey', 'green', 'yellow', 'blue', 'purple', 'red'];

        return colors[index % colors.length];
    }
}
