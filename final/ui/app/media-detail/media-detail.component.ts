import { Component, OnChanges, SimpleChanges, Output, EventEmitter, Input } from 'ng-metadata/core';
import { MediaInstance } from '../../models/media/media.model';
import { UserInstance } from '../../models/user/user.model';
import { RecommendationAttributes } from '../../models/recommendation/recommendation.model';
import template from './media-detail.component.html';


@Component({
    selector: 'media-detail',
    template: template,
})
export class MediaDetailComponent implements OnChanges {

    @Input() public media: MediaInstance;
    @Input() public canRecommend: boolean = false;
    @Input() public userList: UserInstance[] = [];
    @Input() public timesViewed: number = 0;

    @Output() public createRecommendation: EventEmitter<RecommendationAttributes> = new EventEmitter();
    @Output() public addView: EventEmitter<any> = new EventEmitter();

    private newRecommendation: RecommendationAttributes = {};

    public ngOnChanges(changes: SimpleChanges): void {

    }

    public onCreateRecommendation(): void {
        this.newRecommendation.mediaID = this.media.id;
        this.createRecommendation.emit(this.newRecommendation);
        this.newRecommendation = {};
    }

    public onAddView(): void {
        this.addView.emit();
    }
}
