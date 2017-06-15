import { Component, Input, Output, EventEmitter } from 'ng-metadata/core';
import { UserInstance } from '../../models/user/user.model';
import template from './navbar.component.html';
import './navbar.component.css';


@Component({
    selector: 'navbar',
    template: template
})
export class NavbarComponent {

    @Input() public currentUser: UserInstance;

    @Output() public viewChange: EventEmitter<string> = new EventEmitter();
    @Output() public search: EventEmitter<string> = new EventEmitter();
    @Output() public logout: EventEmitter<any> = new EventEmitter();

    private showSearch: boolean = false;
    private searchText: string = "";
}