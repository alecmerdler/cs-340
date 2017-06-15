import { Component, Input, Output, EventEmitter, ViewChild } from 'ng-metadata/core';
import { UserInstance } from '../../models/user/user.model';
import template from './navbar.component.html';
import './navbar.component.css';


@Component({
    selector: 'navbar',
    template: template
})
export class NavbarComponent implements OnInit {

    @Input() public currentUser: UserInstance;
    @Input() public showSearch: boolean = false;

    @Output() public viewChange: EventEmitter<string> = new EventEmitter();
    @Output() public search: EventEmitter<string> = new EventEmitter();
    @Output() public logout: EventEmitter<any> = new EventEmitter();

    @ViewChild('input') public searchInput: HTMLInputElement;

    private searchText: string = "";

    public toggleSearch(): void {
        this.showSearch = !this.showSearch;

        if (this.showSearch) {
            this.searchInput.focus();
        }
    }
}