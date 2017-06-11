import { Component, Inject, OnInit } from 'ng-metadata/core';
import { UserModel, UserInstance } from '../models/user/user.model';
import { MediaModel, MediaInstance } from '../models/media/media.model';
import { ReviewAttributes, ReviewInstance, ReviewModel} from '../models/review/review.model';
import { RecommendationModel, RecommendationInstance, RecommendationAttributes } from '../models/recommendation/recommendation.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
    public userReviews: {[userID: number]: ReviewInstance[]} = {};
    public mediaReviews: {[mediaID: number]: ReviewInstance[]} = {};
    public userList: UserInstance[] = [];
    public isLoading: boolean = true;
    public currentView: BehaviorSubject<string>;
    public currentMedia: MediaInstance;

    private newRecommendation: RecommendationAttributes = {};
    private newReview: ReviewAttributes = {};
    private readonly mediaLimit: number = 6;

    constructor(@Inject(MediaModel) private mediaModel: MediaModel,
                @Inject(UserModel) private userModel: UserModel,
                @Inject(RecommendationModel) private recommendationModel: RecommendationModel,
                @Inject(ReviewModel) private reviewModel: ReviewModel) {
        this.currentView = new BehaviorSubject(window.sessionStorage.getItem("currentView") || 'list');
        this.currentView.subscribe((view) => {
            window.sessionStorage.setItem('currentView', view)
        });

        this.currentUser = JSON.parse(window.sessionStorage.getItem('currentUser')) || null;
    }

    public ngOnInit(): void {
        this.mediaModel.list()
            .then((mediaList) => {
                this.mediaList = mediaList;
                this.isLoading = false;
            });

        if (this.currentUser) {
            this.userModel.list()
                .then((userList) => {
                    this.userList = userList.filter(user => user.id != this.currentUser.id);
                });

            this.recommendationModel.list(this.currentUser.id)
                .then((recommendationsList) => {
                    this.recommendationsList = recommendationsList;
                });

            this.reviewModel.listByUser(this.currentUser.id)
                .then((reviewsList) => {
                    this.userReviews[this.currentUser.id] = reviewsList;
                });
        }
    }

    public createRecommendation(): void {
        this.newRecommendation.recommenderID = this.currentUser.id;
        this.recommendationModel.create(this.newRecommendation)
            .then((response) => {
                this.newRecommendation = null;
            });
    }

    public createReview(): void {

    }

    public recommendMedia(media: MediaInstance): void {
        this.newRecommendation.mediaID = media.id;
        this.currentMedia = media;
        this.currentView.next('detail');
    }

    public reviewMedia(media: MediaInstance): void {
        this.reviewModel.listByMedia(media.id)
            .then((reviewsList) => {
                this.mediaReviews[media.id] = reviewsList;
            });
        
        this.newReview.mediaID = media.id;
        this.currentMedia = media;
        this.currentView.next('detail');
    }

    public onLogin(user: UserInstance): void {
        this.currentUser = user;
        this.currentView.next('list');
    }

    public onSignup(user: UserInstance): void {
        this.currentUser = user;
        this.currentView.next('list');
    }

    public logout(): void {
        this.currentView.next('login');
        this.currentUser = null;
        window.sessionStorage.removeItem('currentUser');
    }
}
