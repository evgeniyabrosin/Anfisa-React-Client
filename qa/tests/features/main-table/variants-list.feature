Feature: Main table, variants list
  As the Anfisa user I want to see variants list on the Main Table page
  
Scenario: Anfisa version
	Given Anfisa site was opened
	When the user looks at the header
	Then Anfisa version should be displayed
​
Scenario: Open Main Table for the "PGP3140_wgs_panel_hl" dataset
	Given Anfisa site was opened
	When user clicks the "PGP3140_wgs_panel_hl" dataset
	And clicks the "Open in viewer" button
	And clicks the "Main table" submenu
	Then the Main table page should be open
	And number of variants should be equal to "2592"
	And number of transcribed variants should be equal to "32719"
	And number of transcripts should be equal to "5997"
		
Scenario: Open Main Table for a secondary dataset of the "xl_PGP3140_wgs_NIST-4_2" dataset
	Given "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user back to the Main Page
	And clicks the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "xl_PGP3140_wgs_NIST-4_27" is expanded
	And user clicks a secondary dataset
	And clicks the "Open in viewer" button
	And clicks the "Main table" submenu
	Then the Main Table page should be open for the secondary dataset
	And number of variants, transcribed variants, And transcripts should be updated And correspond to the opened dataset
	And URL should be updated.
​
Scenario: Change secondary dataset via datasets list
	Given "Main table" for the secondary dataset was opened
	When user clicks the dataset name in the drop-down
	And list of secondary datasets of the "xl_PGP3140_wgs_NIST-4_27" dataset is displayed
	And user clicks another secondary dataset
	Then the Main Table page should be updated for the selected dataset
	And number of variants, transcribed variants, And transcripts should be updated And correspond to the selected dataset
	And URL should be updated.
​
Scenario: Back to the first dataset via datasets list
	Given "Main table" for the secondary dataset was opened
	When user clicks the dataset name in the drop-down
	And list of secondary datasets of the "xl_PGP3140_wgs_NIST-4_27" dataset is displayed
	And user clicks the first one secondary dataset (same as in step 3)
	Then the Main Table page should be updated for the selected dataset
	And number of variants, transcribed variants, And transcripts should be updated And correspond to the selected dataset
	And URL should be updated.
​
Scenario: Copy URL
	Given "Main table" for the secondary dataset was opened
	When user clicks the chain icon near the dataset name
	Then URL should be copied