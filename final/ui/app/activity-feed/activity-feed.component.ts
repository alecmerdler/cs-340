import { Component, Inject, OnInit, Input, OnChanges, SimpleChanges } from 'ng-metadata/core';
import { ReviewAttributes, ReviewInstance, ReviewModel} from '../../models/review/review.model';
import { RecommendationModel, RecommendationInstance, RecommendationAttributes } from '../../models/recommendation/recommendation.model';
import template from './activity-feed.component.html';


@Component({
    selector: 'activity-feed',
    template: template,
})
export class ActivityFeedComponent implements OnInit, OnChanges {

    @Input() public reviews: ReviewInstance[] = [];
    @Input() public recommendations: RecommendationInstance[] = [];
    @Input() public isAnonymous: boolean = false;

    public isLoading: boolean = true;

    constructor(@Inject(RecommendationModel) private recommendationModel: RecommendationModel,
                @Inject(ReviewModel) private reviewModel: ReviewModel) {

    }

    public ngOnInit(): void {

    }

    public ngOnChanges(changes: SimpleChanges): void {

    }
}
