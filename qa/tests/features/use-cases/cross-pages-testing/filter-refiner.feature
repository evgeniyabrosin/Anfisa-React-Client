Feature: Filter refiner, Variant validation
# As an Anfisa user I want to Apply some filters and cross the pages from Filter refiner

    Scenario: 01 Open Filter refiner
		Given Dataset list was opened
		When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
		And the user clicks the "Open in viewer" drop down menu at the middle part of the page
		And clicks the "Filter Refiner"  option in the drop down menu
		Then Filter Refiner of "PGP3140_wgs_panel_hl" dataset should be opened

	Scenario: 02 Apply Preset
	    Given Filter Refiner of "PGP3140_wgs_panel_hl" dataset was opened
	    When User clicks "Select Filter Preset" drop down menu
	    And chooses "⏚Mendelian_Compound_Het" Preset
		And Clicks "Apply Filter"
	    Then Preset should be loaded
	    And 7 variants should be shown

	Scenario: 03 Choose Tag 
	    Given Chosen Preset was loaded
	    When User clicks "Apply" button on the right side of the page
	    And Main Table is opened
	    And User clicks "+ Add Tag"
	    And chooses "Previously categorized" Tag
	    And clicks Apply
	    Then Chosen Tag should be applied
	    And Variants with "Previously categorized" tag should be shown

    Scenario: 04 uncheck filter for preset
	    Given Filter Refiner of "PGP3140_wgs_panel_hl" dataset is opened
	    When User clicks "Select Filter Preset" dropdown menu
		And chooses  "⏚SEQaBOO_Hearing_Loss_v_5"  Preset
		And  Clicks "Apply Filter" 
	    And Filtered Variant amount (22)  is written on the top of page
	    And User Clicks settings (three dots) button near Rules filter
		And Clicks "Delete" button
	    And Variants are filtered (2592)
		And User clicks "+" button near the Rules
	    And User checks the same Filter one more time (Rules, ⏚Hearing Loss, v.5)
		And clicks "+Add attribute" button
	    Then Variant number should be the same as before uncheck (22)

	Scenario: 05 Open Filter Refiner 
	    Given Dataset list was opened
	    When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
	    And the user clicks the "Open in viewer" drop down menu at the middle part of the page
	    And clicks the "Filter Refiner"  option in the drop down menu
	    Then Filter Refiner of "PGP3140_wgs_panel_hl" dataset should be opened

	Scenario: 06 Load preset 
	    Given Filter Refiner of "PGP3140_wgs_panel_hl" dataset was opened
	    When User clicks "Select Filter Preset" drop down menu
	    And chooses "⏚Mendelian_Compound_Het"  Preset
		And Clicks "Apply Filter" 
	    Then Preset should be  loaded

	Scenario: 07 Apply Sample
	    Given chosen preset was  loaded
	    When User clicks "Apply" button on the right side of the page
	    And Main Table is opened
	    And User clicks "+ Add Sample"
	    And User checks "mother [NA24143]" Sample
	    And User clicks "Apply"
	    Then There should be  4 Variants shown

	Scenario: 08 Open filter Refiner
	    Given Dataset list was opened
	    When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
	    And the user clicks the "Open in viewer" drop down menu at the middle part of the page
	    And clicks the "Filter Refiner"  option in the drop down menu
	    Then Filter Refiner of "PGP3140_wgs_panel_hl" dataset should be opened

	Scenario: 09 Load preset and click Apply 
	    Given Filter Refiner of "PGP3140_wgs_panel_hl" dataset was opened
	    When User clicks "Select Filter Preset" drop down menu
	    And chooses  "⏚SEQaBOO_Hearing_Loss_v_5"  Preset
		And  Clicks "Apply Filter" 
	    Then chosen preset should be loaded
	    And 22 Variants should be shown

	Scenario: 10 Apply subfilter 
	    Given Chosen preset was loaded
	    When User clicks "+" button near "Proband_Zygosity "  Filter 
	    And chooses  "Heterozygous" Subfilter
	    And clicks "+ Add Attribute"
	    And clicks "Apply"
	    Then Main table should be opened
	    And 9 Variants should be shown

	Scenario: 11 Uncheck all the filters
	    Given Main table was opened
	    And 9 Variants were shown
	    When User clicks "Edit Filters"
	    And Deletes all the filters with "Clear all" button
	    Then 2592 Variants should be shown
		