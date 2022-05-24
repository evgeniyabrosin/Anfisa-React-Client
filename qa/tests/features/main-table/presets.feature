Feature: Main table, Presets
  As the Anfisa user I want to apply presets to the variants list on the Main Table page
​
	Scenario: List of presets
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Select preset" drop down menu
		Then The list of presets should be displayed.
​
	Scenario: Apply a preset
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks "Select preset" drop down menu
		And user chooses the "⏚SEQaBOO_Hearing_Loss_v_5" preset
		Then the preset should be applied.
​
	Scenario: Apply the same preset
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		And the "⏚SEQaBOO_Hearing_Loss_v_5" preset is applied
		When user clicks "Select preset" drop down menu
		And user chooses the "⏚SEQaBOO_Hearing_Loss_v_5" preset again
		Then the preset should stay be applied
		
	Scenario: Apply another preset
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks "Select preset" drop down menu
		And user chooses the "⏚BGM_Autosomal_Dominant" preset
		Then the preset should be applied.
​
	Scenario: Clear preset
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		And the "⏚BGM_Autosomal_Dominant" preset is applied
		When user clicks the "Clear" button near the preset name
		Then Preset should be cleared.
​
	Scenario: No data
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks "Select preset" drop down menu
		And user chooses the "⏚BGM_Compound_Het" preset
		Then Empty variants list should be displayed
		And the "There are no results. Try to reset filters And try again" message should be displayed
		And the "Reset filters" button should be present
​
	Scenario: Reset filters
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		And the "⏚BGM_Compound_Het" preset is applied
		When clicks "Reset filters" button
		Then filters should be reset