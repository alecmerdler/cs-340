import { Component, Inject, OnInit, Output, EventEmitter, Input } from 'ng-metadata/core';
import { MediaModel, MediaInstance } from '../../models/media/media.model';
import template from './media-browser.component.html';


@Component({
    selector: 'media-browser',
    template: template,
})
export class MediaBrowserComponent implements OnInit {

    @Output() public review: EventEmitter<MediaInstance> = new EventEmitter();
    @Output() public recommend: EventEmitter<MediaInstance> = new EventEmitter();

    public mediaList: MediaInstance[] = [];
    public isLoading: boolean = true;

    private readonly mediaLimit: number = 6;

    constructor(@Inject(MediaModel) private mediaModel: MediaModel) {

    }

    public ngOnInit(): void {
        this.mediaModel.list()
            .then((mediaList) => {
                this.mediaList = mediaList;
                this.isLoading = false;
            });
    }

    public recommendMedia(media: MediaInstance): void {
        this.recommend.emit(media);
    }

    public reviewMedia(media: MediaInstance): void {
        this.review.emit(media);
    }

    private tileClass(index: number): string {
        const colors: string[] = ['grey', 'green', 'yellow', 'blue', 'purple', 'red'];

        return colors[index % colors.length];
    }
}
