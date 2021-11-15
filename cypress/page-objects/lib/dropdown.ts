import { UIElement } from './ui-elements';

export class Dropdown extends UIElement {
    protected _items: string[];

    constructor(selector: string, items: string[], isTextSelector = false) {
        super(selector, isTextSelector);
        this._items = items;
    }
}