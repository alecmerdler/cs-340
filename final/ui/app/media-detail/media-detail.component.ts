import { Component, OnChanges, SimpleChanges, Output, EventEmitter, Input } from 'ng-metadata/core';
import { MediaInstance } from '../../models/media/media.model';
import { RecommendationAttributes } from '../../models/recommendation/recommendation.model';
import template from './media-detail.component.html';


@Component({
    selector: 'media-detail',
    template: template,
})
export class MediaDetailComponent implements OnChanges {

    @Input() public media: MediaInstance;
    @Input() public canRecommend: boolean = false;

    @Output() public createRecommendation: EventEmitter<RecommendationAttributes> = new EventEmitter();

    public isLoading: boolean = true;

    private newRecommendation: RecommendationAttributes = {};

    public ngOnChanges(changes: SimpleChanges): void {

    }
}
