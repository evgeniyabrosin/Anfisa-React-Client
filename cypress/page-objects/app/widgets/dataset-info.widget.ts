import { UIWidget } from "../../lib/ui-widget";
import { Label } from "../../lib/label";
import { UIElement } from "../../lib/ui-elements";

export interface DatasetInfoSelectors {
    openInViewer: string;
    decTreePanel: string;
    datasetHeader: string;
}

export interface DatasetInfoLabels {
    datasetHeader: string;
}

export class DatasetInfoWidget extends UIWidget {
    readonly openInViewer: UIElement
    readonly decTreePanel: UIElement
    readonly datasetHeader: Label

    constructor(options: { selectors: DatasetInfoSelectors, labels: DatasetInfoLabels }) {
        super(options);

        const selectors = options.selectors;
        const labels = options.labels;

        this.openInViewer = new UIElement(selectors.openInViewer)
        this.decTreePanel = new UIElement(selectors.decTreePanel)

        this.datasetHeader = new Label(selectors.datasetHeader, labels.datasetHeader)
    }
}