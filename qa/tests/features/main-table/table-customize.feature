Feature: Main table, Table customization
  As the Anfisa user I want to customize Main Table
  
	Scenario: No "Gene" and "Variants" columns
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
		When  user clicks "Customize table"
		Then "Gene" and "Variant" columns should not be present
​
	Scenario: Compact view
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
		When  user clicks "Customize table"
		and chooses "Compact view"
		and clicks "Apply"
		Then Compact View should be shown.
​
	Scenario: Cozy view
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
		When  user clicks "Customize table"
		and chooses "Cozy view"
		and clicks "Apply"
		Then Cozy View should be shown.
​
	Scenario: Clear all columns
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
		When  user clicks "Customize table"
		and clicks "Clear all"
		and clicks Apply
		Then All chosen columns should be deleted, only "Gene" and "Variant" columns should be displayed.
​
	Scenario: Select all columns
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
		When  user clicks "Customize table"
		and clicks "Select all"
		and clicks Apply
		Then All the chosen columns should be displayed on the screen.
​
	Scenario: Turn off one column
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
		When  user clicks "Customize table"
		and turns off one of the columns
		and clicks Apply
		Then chosen column should be turned off
​
	Scenario: Turn on one column
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
		and one of columns is turned off
		When  user clicks "Customize table"
		and turn on the column
		and clicks Apply
		Then chosen column should be turned on
​
	Scenario: Move column
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
		When  user clicks "Customize table"
		and moves the "Filter" column to the first place
		and clicks Apply
		Then The "Filter" column should be in the third place
		and "Gene" and "Varian" columns should be in the first and second places.