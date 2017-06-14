import { Component, Inject, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from 'ng-metadata/core';
import { ReviewAttributes, ReviewInstance, ReviewModel } from '../../models/review/review.model';
import template from './reviews-list.component.html';
import './reviews-list.component.css';


@Component({
    selector: 'reviews-list',
    template: template,
})
export class ReviewsListComponent implements OnChanges {

    @Input() public reviews: ReviewInstance[] = [];
    @Input() public canReview: boolean = false;
    @Input() public hasReviewed: boolean = false;

    @Output() public createReview: EventEmitter<ReviewAttributes> = new EventEmitter();

    private newReview: ReviewAttributes = {};
    private reviewStars: boolean[] = [false, false, false, false, false];

    public isLoading: boolean = true;

    public ngOnChanges(changes: SimpleChanges): void {
        this.isLoading = false;
    }

    public submitReview(): void {
        this.isLoading = true;
        this.newReview.numStars = this.reviewStars.filter(star => star).length;
        this.createReview.emit(this.newReview);
        this.newReview = {};
        this.reviewStars = [false, false, false, false, false];
    }

    private setStars(stars: number): boolean[] {
        return this.reviewStars.map((star, index) => {
            return index <= stars;
        });
    }
}
