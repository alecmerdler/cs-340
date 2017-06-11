import { Component, Inject, Input, OnChanges, SimpleChanges } from 'ng-metadata/core';
import { ReviewInstance} from '../../models/review/review.model';
import { RecommendationInstance } from '../../models/recommendation/recommendation.model';
import template from './activity-feed.component.html';


@Component({
    selector: 'activity-feed',
    template: template,
})
export class ActivityFeedComponent implements OnChanges {

    @Input() public reviews: ReviewInstance[];
    @Input() public recommendations: RecommendationInstance[];
    @Input() public isAnonymous: boolean = false;

    constructor(@Inject('$timeout') private $timeout: ng.ITimeoutService) {

    }

    private isLoading = true;

    public ngOnChanges(changes: SimpleChanges): void {
        // Artificial loading to show of loading spinner lol
        this.isLoading = true;
        this.$timeout(() => {
            this.isLoading = false;
        }, 1000);
    }
}
