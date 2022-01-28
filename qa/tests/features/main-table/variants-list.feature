Feature: Main table, variants list
  As the Anfisa user I want to see variants list on the Main Table page
  
	Scenario: Anfisa version
		Given Anfisa site is open
		When the user looks at the header
		Then Anfisa version should be displayed
​
	Scenario: Open Main Table for the "PGP3140_wgs_panel_hl" dataset
		Given Anfisa site is open
		When user clicks the "PGP3140_wgs_panel_hl" dataset
		and clicks the "Open in viewer" button
		and clicks the "Main table" submenu
		Then the Main table page should be open
		and number of variants should be equal to "2592"
		and number of transcribed variants should be equal to "32719"
		and number of transcripts should be equal to "5997"
		
	Scenario: Open Main Table for a secondary dataset of the "xl_PGP3140_wgs_NIST-4_2" dataset
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When user back to the Main Page
		and clicks the "xl_PGP3140_wgs_NIST-4_2" dataset
		and the "xl_PGP3140_wgs_NIST-4_27" is expanded
		and user clicks a secondary dataset
		and clicks the "Open in viewer" button
		and clicks the "Main table" submenu
		Then the Main Table page should be open for the secondary dataset
		and number of variants, transcribed variants, and transcripts should be updated and correspond to the opened dataset
		and URL should be updated.
​
	Scenario: Change secondary dataset via datasets list
		Given "Main table" for the secondary dataset is open
		When user clicks the dataset name in the drop-down
		and list of secondary datasets of the "xl_PGP3140_wgs_NIST-4_27" dataset is displayed
		and user clicks another secondary dataset
		Then the Main Table page should be updated for the selected dataset
		and number of variants, transcribed variants, and transcripts should be updated and correspond to the selected dataset
		and URL should be updated.
​
	Scenario: Back to the first dataset via datasets list
		Given "Main table" for the secondary dataset is open
		When user clicks the dataset name in the drop-down
		and list of secondary datasets of the "xl_PGP3140_wgs_NIST-4_27" dataset is displayed
		and user clicks the first one secondary dataset (same as in step 3)
		Then the Main Table page should be updated for the selected dataset
		and number of variants, transcribed variants, and transcripts should be updated and correspond to the selected dataset
		and URL should be updated.
​
	Scenario: Copy URL
		Given "Main table" for the secondary dataset is open
		When user clicks the chain icon near the dataset name
		Then URL should be copied