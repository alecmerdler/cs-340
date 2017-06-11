import { NgModule } from 'ng-metadata/core';
import { AppComponent } from './app.component';
import { UserModel } from '../models/user/user.model';
import { MediaModel } from '../models/media/media.model';
import { RecommendationModel } from '../models/recommendation/recommendation.model';
import { ReviewModel } from '../models/review/review.model';
import { LoginComponent }  from './login/login.component';
import { MediaBrowserComponent } from './media-browser/media-browser.component';
import { MediaDetailComponent } from './media-detail/media-detail.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';


@NgModule({
    imports: [

    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MediaBrowserComponent,
        MediaDetailComponent,
        ReviewsListComponent,
    ],
    providers: [
        {provide: UserModel, useClass: UserModel},
        {provide: MediaModel, useClass: MediaModel},
        {provide: RecommendationModel, useClass: RecommendationModel},
        {provide: ReviewModel, useClass: ReviewModel},
    ]
})
export class AppModule {

}
