import { Component, Inject, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from 'ng-metadata/core';
import { MediaInstance } from '../../models/media/media.model';
import template from './media-detail.component.html';


@Component({
    selector: 'media-detail',
    template: template,
})
export class MediaBrowserComponent implements OnInit, OnChanges {

    @Input() public media: MediaInstance;
    public isLoading: boolean = true;

    public ngOnInit(): void {

    }

    public ngOnChanges(changes: SimpleChanges): void {

    }
}
