import { Component, Inject, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from 'ng-metadata/core';
import { ReviewAttributes, ReviewInstance, ReviewModel } from '../../models/review/review.model';
import template from './reviews-list.component.html';
import './reviews-list.component.css';


@Component({
    selector: 'reviews-list',
    template: template,
})
export class ReviewsListComponent implements OnInit, OnChanges {

    @Input() public reviews: ReviewInstance[] = [];
    @Input() public canReview: boolean = false;

    @Output() public createReview: EventEmitter<ReviewAttributes> = new EventEmitter();

    private newReview: ReviewAttributes = {};
    private reviewStars: boolean[] = [false, false, false, false, false];

    public isLoading: boolean = false;

    public ngOnInit(): void {

    }

    public ngOnChanges(changes: SimpleChanges): void {

    }

    public submitReview(): void {
        this.newReview.numStars = this.reviewStars.filter(star => star).length;
        this.createReview.emit(this.newReview);
    }

    private setStars(stars: number): void {
        this.reviewStars = this.reviewStars.map((star, index) => {
            return index <= stars;
        });
    }
}
