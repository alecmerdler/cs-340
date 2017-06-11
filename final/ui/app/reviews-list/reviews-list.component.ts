import { Component, Inject, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from 'ng-metadata/core';
import { ReviewAttributes, ReviewInstance, ReviewModel } from '../../models/review/review.model';
import template from './reviews-list.component.html';


@Component({
    selector: 'reviews-list',
    template: template,
})
export class ReviewsListComponent implements OnInit, OnChanges {

    @Input() public reviews: ReviewInstance[] = [];
    @Input() public canReview: boolean = false;

    private newReview: ReviewAttributes = {};

    public isLoading: boolean = false;

    public ngOnInit(): void {

    }

    public ngOnChanges(changes: SimpleChanges): void {

    }

    public createReview(): void {

    }
}
