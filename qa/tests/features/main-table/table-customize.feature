Feature: Main table, Table customization
  As the Anfisa user I want to customize Main Table
  
	Scenario: No "Gene" and "Variants" columns
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Customize table"
		Then "Gene" And "Variant" columns should not be present
​
	Scenario: Compact view
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Customize table"
		And chooses "Compact view"
		And clicks "Apply"
		Then Compact View should be shown.
​
	Scenario: Cozy view
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Customize table"
		And chooses "Cozy view"
		And clicks "Apply"
		Then Cozy View should be shown.
​
	Scenario: Clear all columns
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Customize table"
		And clicks "Clear all"
		And clicks Apply
		Then All chosen columns should be deleted, only "Gene" And "Variant" columns should be displayed.
​
	Scenario: Select all columns
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Customize table"
		And clicks "Select all"
		And clicks Apply
		Then All the chosen columns should be displayed on the screen.
​
	Scenario: Turn off one column
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Customize table"
		And turns off one of the columns
		And clicks Apply
		Then chosen column should be turned off
​
	Scenario: Turn on one column
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		And one of columns is turned off
		When  user clicks "Customize table"
		And turn on the column
		And clicks Apply
		Then chosen column should be turned on
​
	Scenario: Move column
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Customize table"
		And moves the "Filter" column to the first place
		And clicks Apply
		Then The "Filter" column should be in the third place
		And "Gene" And "Varian" columns should be in the first And second places.