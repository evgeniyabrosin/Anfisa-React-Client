export interface UIWidgetSelectors { }
export interface UIWidgetLabels { }

/**
 * Base ui widget class. Widget combines several UIElements.
 */
export class UIWidget {
    readonly selectors: UIWidgetSelectors;
    readonly labels: UIWidgetLabels;

    constructor(options: { selectors: UIWidgetSelectors, labels?: UIWidgetLabels }) {
        this.selectors = options.selectors;

        this.labels = options.labels ?? {};
    }

}
