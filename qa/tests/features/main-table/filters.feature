Feature: Main table, Filters
  As the Anfisa user I want to apply filters to the variants list on the Main Table page
  
	Scenario: Open the "Filter Refiner" from the "Main Table" page
		Given Main table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Edit Filters" button
		Then Filter Refiner should be opened.
​
	Scenario: Apply filter
		Given "Filter Refiner" was opened from the "Main Table" page
		When  user chooses the "Callers" filter
		And chooses the "INHERITED_FROM: Father" value
		And clicks "+ Add Attribute" button
		And clicks "Apply" button
		Then the filter should be applied
		And Main table should be opened
​
	Scenario: Apply a few filters
		Given Main table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Edit filters"
		And user clicks the "Callers" filter
		And chooses the "INHERITED_FROM: Father" value
		And clicks "+ Add Attribute" button
		And clicks the "Variant_Class" filter
		And chooses the "deletion" value
		And clicks "+ Add Attribute" button
		And clicks the "Apply" button
		Then chosen filters should be applied
		And Main table should be opened
​
​
	Scenario: Close Filter Refiner without applying
		Given Main table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Edit filters" button
		And user clicks the "Callers" filter
		And chooses the "INHERITED_FROM: Father" value
		And clicks "+ Add Attribute" button
		And clicks the Close button "X"
		Then the chosen filter should not be applied
		And Anfisa Main Page should be opened