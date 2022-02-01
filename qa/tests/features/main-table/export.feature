Feature: Main table, Export
  As the Anfisa user I want to export variants list from the Main Table page
  
	Scenario: Excel: Too many variants to export
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		When user clicks "Export report"
		and Export panel is opened
		and user clicks "Excel"
		Then "There are too many variants to export. The number of variants should be less than 300" error message should be displayed.
​
	Scenario: CSV: Too many variants to export
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		When user clicks "Export report"
		and Export panel is opened
		and user clicks "CSV"
		Then "There are too many variants to export. The number of variants should be less than 300" error message should be displayed.
​
	Scenario: Excel export with filters (Filter Refiner)
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		When user clicks the "Edit Filters" button
		and the "Filter Refiner" is open
		and user clicks the "Rules" attribute
		and chooses the "⏚Possibly_Damaging_Predictions" value
		and clicks the "Add" button
		and clicks the "Apply" button
		and the "Main Table" page is open for 58 variants
		and  user clicks "Export report"
		and clicks "Excel"
		Then Dataset should be exported.
​
	Scenario: Excel export with filter by Tag(s)
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		and there are no applied filters
		When user clicks the "+ Add" button near the "Tag(s)" filter
		and chooses the "Previously categorized" value
		and clicks the "Apply" button
		and filter by tag is applied
		and user clicks "Export report"
		and clicks "Excel"
		Then Dataset should be exported.
​
	Scenario: Excel export with preset
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		and there are no applied filters
		When user applies the "⏚BGM_Homozygous_Rec" preset
		and clicks "Export report"
		and clicks "Excel"
		Then Dataset should be exported.
​
	Scenario: Excel export - No data
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		and there are no applied filters
		When user applies the "⏚BGM_Compound_Het" preset
		and clicks "Export report"
		and clicks "Excel"
		Then Dataset should not be exported
​
	Scenario: Excel export without filters
		Given "Main Table" is open for a dataset with a number of variants less than 300
		When user clicks "Export report"
		and Export panel is opened
		and user clicks "Excel"
		Then Dataset should be exported.
​
	Scenario: CSV export with filters (Filter Refiner)
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		When user clicks the "Edit Filters" button
		and the "Filter Refiner" is open
		and user clicks the "Rules" attribute
		and chooses the "⏚Possibly_Damaging_Predictions" value
		and clicks the "Add" button
		and clicks the "Apply" button
		and the "Main Table" page is open for 58 variants
		and  user clicks "Export report"
		and clicks "CSV"
		Then Dataset should be exported.
​
	Scenario: CSV export with filter by Tag(s)
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		and there are no applied filters
		When user clicks the "+ Add" button near the "Tag(s)" filter
		and chooses the "Previously categorized" value
		and clicks the "Apply" button
		and filter by tag is applied
		and user clicks "Export report"
		and clicks "CSV"
		Then Dataset should be exported.
​
	Scenario: CSV export with preset
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		and there are no applied filters
		When user applies the "⏚BGM_Homozygous_Rec" preset
		and clicks "Export report"
		and clicks "CSV"
		Then Dataset should be exported.
​
	Scenario: Excel export - No data
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		and there are no applied filters
		When user applies the "⏚BGM_Compound_Het" preset
		and clicks "Export report"
		and clicks "Excel"
		Then Dataset should not be exported
​
	Scenario: CSV export without filters
		Given "Main Table" is open for a dataset with a number of variants less than 300
		When user clicks "Export report"
		and Export panel is opened
		and user clicks "CSV"
		Then Dataset should be exported.
​
	Scenario: CSV export with Preset + Filter + Zone filter
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		When user clicks the "+ Add" button near the "Tag(s)" filter
		and chooses the "Previously categorized" value
		and clicks the "Apply" button
		and filter by tag is applied
		and user clicks the "Edit Filters" button
		and the "Filter Refiner" is open
		and user clicks the "Callers" attribute
		and chooses the "GATK_Haplotype_Caller" value
		and clicks the "Add" button
		and clicks the "Apply" button
		and user applies the "⏚BGM_Homozygous_Rec" preset
		and clicks "Export report"
		and clicks "Excel"
		Then Dataset should be exported
​
	Scenario: CSV export with Preset + Filter + Zone filter
		Given "Main Table" is open for the "PGP3140_wgs_panel_hl" dataset
		When user clicks the "+ Add" button near the "Tag(s)" filter
		and chooses the "Previously categorized" value
		and clicks the "Apply" button
		and filter by tag is applied
		and user clicks the "Edit Filters" button
		and the "Filter Refiner" is open
		and user clicks the "Callers" attribute
		and chooses the "GATK_Haplotype_Caller" value
		and clicks the "Add" button
		and clicks the "Apply" button
		and user applies the "⏚BGM_Homozygous_Rec" preset
		and clicks "Export report"
		and clicks "CSV"
		Then Dataset should be exported
​
	Scenario: Excel export with Preset + Filter
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
		When  user chooses the "⏚SEQaBOO_Hearing_Loss_v_5" preset
		and user clicks the "Edit filters" button
		and clicks the "Callers" attribute"
		and chooses the "BGM_CMPD_HET" value
		and clicks the "Add" button
		and clicks the "Apply" button
		and clicks "Export report"
		and clicks "Excel"
		Then Dataset should be exported