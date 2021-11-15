import { UIWidget } from "../../lib/ui-widget";
import { Label } from "../../lib/label";
import { Input } from "../../lib/input";


export interface LeftPanelSelectors {
    searchInput: string;
    leftPanelHeader: string;
}

export interface LeftPanelLabels {
    leftPanelHeader: string;
}

export class LeftPanelWidget extends UIWidget {
    readonly searchInput: Input
    readonly leftPanelHeader: Label

    constructor(options: { selectors: LeftPanelSelectors, labels: LeftPanelLabels }) {
        super(options);

        const selectors = options.selectors;
        const labels = options.labels;

        this.searchInput = new Input(selectors.searchInput)
        this.leftPanelHeader = new Label(selectors.leftPanelHeader, labels.leftPanelHeader)
    }

}
