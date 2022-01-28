Feature: Main table, Filters
  As the Anfisa user I want to apply filters to the variants list on the Main Table page
  
	Scenario: Open the "Filter Refiner" from the "Main Table" page
		Given Main table for the "PGP3140_wgs_panel_hl" dataset is open.
		When  user clicks "Edit Filters"
		Then Filter Refiner should be opened.
​
	Scenario: Apply filter
		Given "Filter Refiner" is open from the "Main Table" page
		When  user chooses the "Callers" filter
		and chooses the "INHERITED_FROM: Father" value
		and clicks "Apply"
		Then the filter should be applied
​
	Scenario: Apply a few filters
		Given Main table for the "PGP3140_wgs_panel_hl" dataset is open.
		When  user clicks "Edit filters"
		and user clicks the "Callers" filter
		and chooses the "INHERITED_FROM: Father" value
		and clicks the "Add" button
		and clicks the "Variant_Class" filter
		and chooses the "deletion" value
		and clicks the "Add" button
		and clicks the "Apply" button
		Then chosen filters should be applied
​
	Scenario: Turn off filters
		Given Main table for the "PGP3140_wgs_panel_hl" dataset is open
		and a few filters are applied
		When user clicks "Turn off filters" near filter zone
		Then filters should be turned off.
​
	Scenario: Turn on filters
		Given Main table for the "PGP3140_wgs_panel_hl" dataset is open
		and a few filters are applied
		and filters are turned off
		When user clicks "Turn on filters"
		Then Filters should be turned on again
​
	Scenario: Close Filter Refiner without applying
		Given Main table for the "PGP3140_wgs_panel_hl" dataset is open.
		When  user clicks "Edit filters"
		And user clicks the "Callers" filter
		and chooses the "INHERITED_FROM: Father" value
		and clicks the "Add" button
		And clicks the Close button "X"
		Then the chosen filter should not be applied (Back to the Main table)