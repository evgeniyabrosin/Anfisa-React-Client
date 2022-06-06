Feature: Decision tree, Variant validation
# As an Anfisa user, I want to Apply some filters and cross the pages from Decision tree

    Scenario: 01 Open Decision tree panel
		Given Dataset list was opened
		When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
		And the user clicks the "Open in viewer" drop down menu at the middle part of the page
		And clicks the "Decision Tree Panel"  option in the drop down menu
		Then Decision Tree Panel of "PGP3140_wgs_panel_hl" dataset should be opened

	Scenario: 02 Load Decision tree and open Filter refiner
	    Given Decision Tree Panel of "PGP3140_wgs_panel_hl" dataset was opened
	    When User clicks "Select Decision Tree"
	    And User chooses "⏚BGM Research" Decision Tree
		And Clicks "Apply Filter"
	    And Chosen Decision Tree is loaded
	    And User clicks "Filtering method"
	    And chooses "Filter Refiner"
	    Then Filter Refiner should be opened

	Scenario: 03 Reopen Decision tree from Filter refiner
	    Given "⏚BGM Research" Decision Tree was loaded
	    And Filter Refiner was opened
	    When User clicks "Filtering method"
	    And chooses "Decision Tree"
	    Then There should be blank Decision Tree shown

	Scenario: 04 Open Decision tree Panel 
	    Given Dataset list was opened
	    When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
	    And the user clicks the "Open in viewer" drop down menu at the middle part of the page
	    And clicks the "Decision Tree Panel"  option in the drop down menu
	    Then Decision Tree Panel of "PGP3140_wgs_panel_hl" dataset should be opened

	Scenario: 05 Add attribute to the firs step
	    Given Decision Tree Panel of "PGP3140_wgs_panel_hl" dataset was opened
	    When User clicks "Add attribute" near the first step
	    And Clicks "+" Button near "Callers" 
	    And Checks "BGM_CMPD_HET" filter from "Callers"
	    And clicks "Add attribute"
	    Then Attribute should be added to the first step
	    And accepted variants should be 186

	Scenario: 06 Save dataset 
	    Given  Attribute was added to the first step
	    When User clicks "Create Derive DS" near Dataset creation
	    And user enters the name for Dataset
	    And clicks "Add dataset"
	    Then Dataset should be created
	    And "Open It" button should be shown

	Scenario: 07 Open newly saved Dataset
	    Given "Open It" button was shown after creation of Dataset
	    When user clicks "Open It"
	    Then Newly created Dataset should be opened in Main Table
	    And 186 Variants should be shown

	Scenario: 08 Load preset and uncheck all the filters
	    Given Newly created Dataset was opened in Main Table
	    When user clicks "Select Preset" 
	    And user chooses "⏚SEQaBOO_Hearing_Quick" preset
	    And  4 variants are shown
	    And user clicks "Edit Filters"
	    And Deletes all chosen Filters with clicking "Clear all" button
	    Then Variant numbers should be recalculated
	    And 186 Variants should be shown again