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
    public userRecommendations: RecommendationInstance[] = [];
    public userReviews: {[userID: number]: ReviewInstance[]} = {};
    public mediaReviews: {[mediaID: number]: ReviewInstance[]} = {};
    public userList: UserInstance[] = [];
    public currentView: BehaviorSubject<string>;
    public currentMedia: MediaInstance;

    constructor(@Inject(MediaModel) private mediaModel: MediaModel,
                @Inject(UserModel) private userModel: UserModel,
                @Inject(RecommendationModel) private recommendationModel: RecommendationModel,
                @Inject(ReviewModel) private reviewModel: ReviewModel) {
        this.currentView = new BehaviorSubject(window.sessionStorage.getItem("currentView") || 'list');
        this.currentView.subscribe((view) => {
            window.sessionStorage.setItem('currentView', view);
        });

        this.currentUser = JSON.parse(window.sessionStorage.getItem('currentUser')) || null;
        this.currentMedia = JSON.parse(window.sessionStorage.getItem('currentMedia')) || null;
    }

    public ngOnInit(): void {
        this.mediaModel.list()
            .then((mediaList) => {
                this.mediaList = mediaList;
            });

        if (this.currentMedia) {
            this.reviewModel.listByMedia(this.currentMedia.id)
                .then((reviewsList) => {
                    this.mediaReviews[this.currentMedia.id] = reviewsList;
                    console.log(this.mediaReviews);
                    console.log(reviewsList);
                });
        }

        if (this.currentUser) {
            this.userModel.list()
                .then((userList) => {
                    this.userList = userList.filter(user => user.id != this.currentUser.id);
                });

            this.recommendationModel.list(this.currentUser.id)
                .then((recommendations) => {
                    this.userRecommendations = recommendations;
                });

            this.reviewModel.listByUser(this.currentUser.id)
                .then((reviewsList) => {
                    this.userReviews[this.currentUser.id] = reviewsList;
                });
        }
    }

    public onCreateReview(review: ReviewAttributes): void {
        review.userID = this.currentUser.id;
        review.mediaID = this.currentMedia.id;
        this.reviewModel.create(review)
            .then((newReview) => {
                console.log(newReview);
            });
    }

    public onCreateRecommendation(recommendation: RecommendationAttributes): void {
        recommendation.recommenderID = this.currentUser.id;
        this.recommendationModel.create(recommendation)
            .then((newRecommendation) => {
                console.log(newRecommendation);
            });
    }

    public viewMediaDetail(media: MediaInstance): void {
        this.reviewModel.listByMedia(media.id)
            .then((reviewsList) => {
                this.mediaReviews[media.id] = reviewsList;
            });

        this.currentMedia = media;
        window.sessionStorage.setItem('currentMedia', JSON.stringify(media));
        this.currentView.next('detail');
    }

    public onLogin(user: UserInstance): void {
        this.currentUser = user;
        this.ngOnInit();
        this.currentView.next('list');
    }

    public onSignup(user: UserInstance): void {
        this.currentUser = user;
        this.ngOnInit();
        this.currentView.next('list');
    }

    public logout(): void {
        this.currentView.next('login');
        this.currentUser = null;
        window.sessionStorage.removeItem('currentUser');
    }
}
