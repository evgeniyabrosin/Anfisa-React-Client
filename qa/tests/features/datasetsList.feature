Feature: Datasets list
	As a Anfisa user I want to work with datasets list on the Main Page.

	Scenario: Anfisa version
		Given Anfisa site was opened
		When the user looks at the header
		Then Anfisa version should be displayed

	Scenario: Collapse datasets list
		Given the "Dataset list" was opened
		When the user clicks the "Collapse list" button
		Then the datasets list should be hidden

	Scenario: Expand datasets list
		Given the "Dataset list" is hidden
		When the user clicks the "Expand list" button
		Then the datasets list should be displayed
	​
	Scenario: Search by dataset name
		Given the "Dataset list" was opened
		When the user enters an existed dataset name in the Search field
		Then the dataset should be found
	​
	Scenario Outline: Search by dataset name
		Given the "Dataset list" was opened
		When the user enters an existed dataset name in the Search field
		And the entered value is in upper-case (<DATASET_NAME>)
		Then the dataset should be found
		​
		Examples:
	<DATASET_NAME>
	PGP3140_WGS_PANEL_HL

	Scenario Outline: Search by dataset name from the middle
		Given the "Dataset list" was opened
		When the user enters an existed dataset name in the Search field
		And the value is part from the middle of the dataset name (<DATASET_NAME>)
		Then the dataset should be found
		​
		Examples:
	<DATASET_NAME>
	WGS_PANEL

	Scenario: Sort by Name, DESC
		Given the "Dataset list" was opened
		When the user clicks the "Sort by Name, DESC" button
		Then the dataset should be sorted by name, DESC
	​
	Scenario: Sort by Name, ASC
		Given the "Dataset list" was opened
		When the user clicks the "Sort by Name, ASC" button
		Then the dataset should be sorted by name, ASC

	Scenario: Created at, DESC
		Given the "Dataset list" was opened
		When the user clicks the "Created at, DESC" button
		Then the dataset should be sorted by name, DESC

	Scenario: Created at, ASC
		Given the "Dataset list" was opened
		When the user clicks the "Sort by Created at, ASC" button
		Then the dataset should be sorted by name, ASC

	Scenario: XL dataset with children is expanded
		Given the "Dataset list" was opened
		When the user clicks an XL dataset with children WS datasets
		Then the XL dataset should be expanded

	Scenario: XL dataset without children
		Given the "Dataset list" was opened
		When the user clicks an XL dataset without children datasets
		Then the XL dataset should not be expanded

	Scenario: WS - Open in viewer
		Given the "Dataset list" was opened
		When the user clicks a WS dataset
		And clicks the "Open in viewer" button
		Then "Main table" And "Decision Tree panel" options should present in the submenu

	Scenario: WS - Main Table can be open
		Given the "Open in viewer" menu was opened for a WS dataset
		When the user clicks the "Main table" submenu
		Then Main table screen should be open for the selected dataset

	Scenario: WS - Back from Main table
		Given the "Main table" screen was opened for a WS dataset
		When the user clicks the Back button in a browser
		Then Main page should be open

	Scenario: WS - Decision Tree can be open
		Given the "Dataset list" was opened
		When the user clicks a WS dataset
		And clicks the "Open in viewer" button
		And clicks the "Decision Tree panel" submenu
		Then Decision Tree panel should be open for the selected dataset

	Scenario: WS - Back from Decision Tree
		Given the "Decision Tree panel" screen was opened for a WS dataset
		When the user clicks the Close button (cross icon)
		Then Main page should be open

	Scenario: XL - Decision Tree menu is present
		Given the "Dataset list" was opened
		When the user clicks an XL dataset
		And clicks the "Open in viewer" button
		Then Only "Decision Tree panel" option should present in the submenu

	Scenario: XL - Decision Tree can be open
		Given the "Open in viewer" menu was opened for the XL dataset
		When the user clicks the "Decision Tree panel" submenu
		Then Decision Tree panel should be open for the selected dataset

	Scenario: XL - Back from Decision Tree
		Given the "Decision Tree panel" screen was opened for the XL dataset
		When the user clicks the Close button (cross icon)
		Then Main page should be open

	Scenario: XL - Decision Tree for another dataset is open
		Given the "Dataset list" was opened
		When the user clicks another XL dataset
		And clicks the "Open in viewer" button
		And clicks the "Decision Tree panel" submenu
		Then The Decision tree for the second dataset should be open

	Scenario: XL - Back from Decision Tree
		Given the "Decision Tree panel" screen was opened for the XL dataset
		When the user clicks the Close button (cross icon)
		Then Main page should be open

	Scenario: XL - Info
		Given the "Dataset list" was opened
		When the user clicks an XL dataset
		And looks at the right side of the screen
		Then Information about the XL dataset should be displayed

	Scenario: WS - Info
		Given the "Dataset list" was opened
		When the user clicks a WS dataset
		And looks at the right side of the screen
		Then Information about the WS dataset should be displayed
