Feature: Filter refiner, Variant validation
# As an Anfisa user I want to Apply some filters and cross the pages from Filter refiner

    Scenario: Open Filter refiner
		Given Dataset list was opened
		When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
		And the user clicks the "Open in viewer" drop down menu at the middle part of the page
		And clicks the "Filter Refiner"  option in the drop down menu
		Then Filter Refiner of "PGP3140_wgs_panel_hl" dataset should be opened

	Scenario: Apply Preset
	    Given Filter Refiner of "PGP3140_wgs_panel_hl" dataset was opened
	    When User clicks "Preset" drop down menu
	    And chooses "⏚Mendelian_Compound_Het" Preset
	    And user clicks "Actions"
	    And user clicks "Load"
	    And User clicks "Apply" button near the drop down menu
	    Then Preset should be loaded
	    And 7 variants should be shown

	Scenario: Choose Tag 
	    Given Chosen Preset was loaded
	    When User clicks "Apply" button on the right side of the page
	    And Main Table is opened
	    And User clicks "Tags"
	    And chooses "Previously categorized" Tag
	    And clicks Apply
	    Then Chosen Tag should be applied
	    And 2 Variants should be shown

    Scenario: uncheck filter for preset
	    Given Chosen Preset and Tag were applied
	    When User clicks "Edit Filters"
	    And Filtered Variant amount (2)  is written on the top of page
	    And User unchecks "Transcript_consequence" Filter
	    And Variants are filtered (7)
	    And User checks the same Filter one more time
	    Then Variant number should be the same as before uncheck (2)

	Scenario: Open Filter Refiner 
	    Given Dataset list was opened
	    When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
	    And the user clicks the "Open in viewer" drop down menu at the middle part of the page
	    And clicks the "Filter Refiner"  option in the drop down menu
	    Then Filter Refiner of "PGP3140_wgs_panel_hl" dataset should be opened

	Scenario: Load preset 
	    Given Filter Refiner of "PGP3140_wgs_panel_hl" dataset was opened
	    When User clicks "Preset" drop down menu
	    And chooses "⏚Mendelian_Compound_Het"  Preset
	    And user clicks "Actions"
	    And user clicks "Load"
	    And User clicks "Apply" button near the drop down menu
	    Then Preset should be  loaded

	Scenario: Apply Sample
	    Given chosen preset was  loaded
	    When User clicks "Apply" button on the right side of the page
	    And Main Table is opened
	    And User clicks "Samples"
	    And User clicks "mother [NA24143]" Sample
	    And User clicks "Apply"
	    Then There should be  4 Variants shown

	Scenario: Open filter Refiner
	    Given Dataset list was opened
	    When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
	    And the user clicks the "Open in viewer" drop down menu at the middle part of the page
	    And clicks the "Filter Refiner"  option in the drop down menu
	    Then Filter Refiner of "PGP3140_wgs_panel_hl" dataset should be opened

	Scenario: Load preset and click Apply 
	    Given Filter Refiner of "PGP3140_wgs_panel_hl" dataset was opened
	    When User clicks "Preset" drop down menu
	    And chooses  "⏚SEQaBOO_Hearing_Loss_v_5"  Preset
	    And user clicks "Actions"
	    And user clicks "Load"
	    And User clicks "Apply" button near the drop down menu
	    Then chosen preset should be loaded
	    And 22 Variants should be shown

	Scenario: Apply subfilter 
	    Given Chosen preset was loaded
	    When User clicks "Proband_Zygosity "  Filter
	    And chooses  "Heterozygous" Subfilter
	    And clicks "Add"
	    And clicks "Apply"
	    Then Main table should be opened
	    And 9 Variants should be shown

	Scenario: Uncheck all the filters
	    Given Main table was opened
	    And 9 Variants are shown
	    When User clicks "Edit Filters"
	    And unchecks all the filters
	    Then 2592 Variants should be shown
		