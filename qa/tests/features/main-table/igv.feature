Feature: Main table, IGV
  As the Anfisa user I want to see details of a variant in IGV
  
	Scenario: The "Open IGV" button is not present
		Given Main Table is open
		When user clicks a variant without IGV
		and Drawer is open
		and user looks at the header of the "General" section
		Then the "Open IGV" button should not be present.
​
	Scenario: The "Open IGV" button is present
		Given Main Table is open
		When user clicks a variant with IGV
		and Drawer is open
		and user looks at the header of the "General" section
		Then the "Open IGV" button should be present.
​
	Scenario: IGV is open
		Given Drawer is open
		When user clicks the "Open IGV" button
		Then IGV should be open in a new tab.