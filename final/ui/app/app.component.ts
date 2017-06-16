import { Component, Inject, OnInit } from 'ng-metadata/core';
import { UserModel, UserInstance } from '../models/user/user.model';
import { MediaModel, MediaInstance } from '../models/media/media.model';
import { ReviewAttributes, ReviewInstance, ReviewModel} from '../models/review/review.model';
import { RecommendationModel, RecommendationInstance, RecommendationAttributes } from '../models/recommendation/recommendation.model';
import { ViewAttributes, ViewInstance, ViewModel } from '../models/view/view.model';
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
    public userViews: {[userID: number]: ViewInstance[]} = {};
    public mediaViews: {[mediaID: number]: ViewInstance[]} = {};
    public userList: UserInstance[] = [];
    public currentView: BehaviorSubject<string>;
    public currentMedia: MediaInstance;
    public searchResults: MediaInstance[] = [];

    private userHasReviewed: boolean = false;
    private showSearchResults: boolean = false;

    constructor(@Inject(MediaModel) private mediaModel: MediaModel,
                @Inject(UserModel) private userModel: UserModel,
                @Inject(RecommendationModel) private recommendationModel: RecommendationModel,
                @Inject(ReviewModel) private reviewModel: ReviewModel,
                @Inject(ViewModel) private viewModel: ViewModel,
                @Inject('$window') private $window: ng.IWindowService) {
        this.currentView = new BehaviorSubject(this.$window.sessionStorage.getItem("currentView") || 'home');
        this.currentView.subscribe((view) => {
            this.showSearchResults = false;
            this.ngOnInit();
            this.$window.sessionStorage.setItem('currentView', view);
            this.$window.scroll(0, 0);
        });

        this.currentUser = JSON.parse(this.$window.sessionStorage.getItem('currentUser')) || null;
        this.currentMedia = JSON.parse(this.$window.sessionStorage.getItem('currentMedia')) || null;
    }

    public ngOnInit(): void {
        this.showSearchResults = false;
        this.mediaModel.list()
            .then((mediaList) => {
                this.mediaList = mediaList;
            });

        if (this.currentMedia) {
            this.reviewModel.listByMedia(this.currentMedia.id)
                .then((reviewsList) => {
                    this.mediaReviews[this.currentMedia.id] = reviewsList;
                });

            this.viewModel.listByMedia(this.currentMedia.id)
                .then((viewsList) => {
                    this.mediaViews[this.currentMedia.id] = viewsList;
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

            this.viewModel.listByUser(this.currentUser.id)
                .then((viewsList) => {
                    this.userViews[this.currentUser.id] = viewsList;
                });
        }
    }

    public onCreateReview(review: ReviewAttributes): void {
        review.userID = this.currentUser.id;
        review.mediaID = this.currentMedia.id;
        this.reviewModel.create(review)
            .then((newReview) => {
                return this.reviewModel.listByMedia(this.currentMedia.id);
            })
            .then((updatedReviews) => {
                this.mediaReviews[this.currentMedia.id] = updatedReviews;
            });
    }

    public onCreateRecommendation(recommendation: RecommendationAttributes): void {
        recommendation.recommenderID = this.currentUser.id;
        this.recommendationModel.create(recommendation)
            .then((newRecommendation) => {
                this.currentView.next('home');
            });
    }

    public viewMediaDetail(media: MediaInstance): void {
        this.currentMedia = media;
        this.reviewModel.listByMedia(media.id)
            .then((reviewsList) => {
                this.mediaReviews[media.id] = reviewsList;
            });

        this.viewModel.listByMedia(this.currentMedia.id)
            .then((viewsList) => {
                this.mediaViews[this.currentMedia.id] = viewsList;
            });

        this.currentMedia = media;
        this.$window.sessionStorage.setItem('currentMedia', JSON.stringify(media));
        this.currentView.next('detail');
    }

    public onAddView(): void {
        const view: ViewAttributes = {userID: this.currentUser.id, mediaID: this.currentMedia.id};
        this.viewModel.create(view)
            .then((newView) => {
                return this.viewModel.listByMedia(this.currentMedia.id);
            })
            .then((viewsList) => {
                this.mediaViews[this.currentMedia.id] = viewsList;
            });
    }

    public onSearch(event: string): void {
        if (event && event.length > 0) {
            this.showSearchResults = true;

            this.mediaModel.search(event)
                .then((searchResults) => {
                    this.searchResults = searchResults;
                });
        }
        else {
            this.showSearchResults = false;
        }
    }

    public onLogin(user: UserInstance): void {
        this.currentUser = user;
        this.ngOnInit();
        this.currentView.next('home');
    }

    public onSignup(user: UserInstance): void {
        this.currentUser = user;
        this.ngOnInit();
        this.currentView.next('home');
    }

    public onLogout(): void {
        this.currentUser = null;
        this.currentView.next('login');
        this.$window.sessionStorage.removeItem('currentUser');
    }
}
