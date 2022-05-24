Feature: Main table, Export
  As the Anfisa user I want to export variants list from the Main Table page
  
	Scenario: Excel: Too many variants to export
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		When user clicks "Export report"
		And Export panel is opened
		And user clicks "Excel"
		Then "There are too many variants to export. The number of variants should be less than 300" error message should be displayed.
​
	Scenario: CSV: Too many variants to export
		Given "Main Table"was opened for the "PGP3140_wgs_panel_hl" dataset
		When user clicks "Export report"
		And Export panel is opened
		And user clicks "CSV"
		Then "There are too many variants to export. The number of variants should be less than 300" error message should be displayed.
​
	Scenario: Excel export with filters (Filter Refiner)
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		When user clicks the "Edit Filters" button
		And the "Filter Refiner" is open
		And user clicks the "Rules" attribute
		And chooses the "⏚Possibly_Damaging_Predictions" value
		And clicks the "Add" button
		And clicks the "Apply" button
		And the "Main Table" page is open for 58 variants
		And  user clicks "Export report"
		And clicks "Excel"
		Then Dataset should be exported.
​
	Scenario: Excel export with filter by Tag(s)
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		And there are no applied filters
		When user clicks the "+ Add" button near the "Tag(s)" filter
		And chooses the "Previously categorized" value
		And clicks the "Apply" button
		And filter by tag is applied
		And user clicks "Export report"
		And clicks "Excel"
		Then Dataset should be exported.
​
	Scenario: Excel export with preset
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		And there are no applied filters
		When user applies the "⏚BGM_Homozygous_Rec" preset
		And clicks "Export report"
		And clicks "Excel"
		Then Dataset should be exported.
​
	Scenario: Excel export - No data
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		And there are no applied filters
		When user applies the "⏚BGM_Compound_Het" preset
		And Tries to click "Export report"
        Then  User should be unable to click "Export report" button when there is 0 variant
​
	Scenario: Excel export without filters
		Given "Main Table" was opened for a dataset with a number of variants less than 300
		When user clicks "Export report"
		And Export panel is opened
		And user clicks "Excel"
		Then Dataset should be exported.
​
	Scenario: CSV export with filters (Filter Refiner)
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		When user clicks the "Edit Filters" button
		And the "Filter Refiner" is open
		And user clicks the "Rules" attribute
		And chooses the "⏚Possibly_Damaging_Predictions" value
		And clicks the "Add" button
		And clicks the "Apply" button
		And the "Main Table" page is open for 58 variants
		And  user clicks "Export report"
		And clicks "CSV"
		Then Dataset should be exported.
​
	Scenario: CSV export with filter by Tag(s)
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		And there are no applied filters
		When user clicks the "+ Add" button near the "Tag(s)" filter
		And chooses the "Previously categorized" value
		And clicks the "Apply" button
		And filter by tag is applied
		And user clicks "Export report"
		And clicks "CSV"
		Then Dataset should be exported.
​
	Scenario: CSV export with preset
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		And there are no applied filters
		When user applies the "⏚BGM_Homozygous_Rec" preset
		And clicks "Export report"
		And clicks "CSV"
		Then Dataset should be exported.
​
​
	Scenario: CSV export without filters
		Given "Main Table" was opened for a dataset with a number of variants less than 300
		When user clicks "Export report"
		And Export panel is opened
		And user clicks "CSV"
		Then Dataset should be exported.
​
	Scenario: CSV export with Preset + Filter + Zone filter
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		When user clicks the "+ Add" button near the "Tag(s)" filter
		And chooses the "Previously categorized" value
		And clicks the "Apply" button
		And filter by tag is applied
		And user clicks the "Edit Filters" button
		And the "Filter Refiner" is open
		And user clicks the "Callers" attribute
		And chooses the "GATK_Haplotype_Caller" value
		And clicks the "Add" button
		And clicks the "Apply" button
		And user applies the "⏚BGM_Homozygous_Rec" preset
		And clicks "Export report"
		And clicks "Excel"
		Then Dataset should be exported
​
	Scenario: CSV export with Preset + Filter + Zone filter
		Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
		When user clicks the "+ Add" button near the "Tag(s)" filter
		And chooses the "Previously categorized" value
		And clicks the "Apply" button
		And filter by tag is applied
		And user clicks the "Edit Filters" button
		And the "Filter Refiner" is open
		And user clicks the "Callers" attribute
		And chooses the "GATK_Haplotype_Caller" value
		And clicks the "Add" button
		And clicks the "Apply" button
		And user applies the "⏚BGM_Homozygous_Rec" preset
		And clicks "Export report"
		And clicks "CSV"
		Then Dataset should be exported
​
	Scenario: Excel export with Preset + Filter
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user chooses the "⏚SEQaBOO_Hearing_Loss_v_5" preset
		And user clicks the "Edit filters" button
		And clicks the "Callers" attribute
		And chooses the "BGM_CMPD_HET" value
		And clicks the "Add" button
		And clicks the "Apply" button
		And clicks "Export report"
		And clicks "Excel"
		Then Dataset should be exported