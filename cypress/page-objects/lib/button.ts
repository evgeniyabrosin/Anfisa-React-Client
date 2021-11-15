import { UIElement } from './ui-elements';

export class Button extends UIElement {
    /**
     * Get current element and check inner text
     */
    checkButtonText(text: string) {
        return this.getElement().should('have.text', text);
    }
}