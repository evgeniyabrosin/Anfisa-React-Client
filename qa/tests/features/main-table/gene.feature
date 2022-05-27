Feature: Main table, Filter by Gene
    As the Anfisa user I want to filter variants list by Gene

Scenario: Open the "Main Table" page

	Given The Main page was open
	When User clicks a WS dataset
	And clicks the "Open in viewer" button
	And clicks the "Main Table" sub-menu
	Then The "Main Table" page should be opened
    ​
Scenario: Genes correspond to the dataset

	Given The "Main Table" for the WS dataset was open
	When user clicks the "+ Add Gene" button 
	Then "Gene" dialog should be displayed
	And Genes should correspond to the dataset

Scenario: Open the "Main Table" page for another dataset

	Given The "Main Table" for the WS dataset was open
	When user goes back to the Main page screen
	And clicks another WS dataset
	And clicks the "Open in viewer" button
	And clicks the "Main Table" sub-menu
	Then The "Main Table" page should be opened
    ​
Scenario: Genes correspond to the dataset

	Given The "Main Table" for the WS dataset was open
	When user clicks the "+ Add Gene" button
	Then "Gene" dialog should be displayed
	And Genes should correspond to the dataset

Scenario: Select a gene without applying

	Given The "Main Table" for the WS dataset was open
	When User clicks the "+ Add Gene" button
	And "Gene" dialog is opened
	And User clicks a gene
	Then Gene should be checked but should not be added to the panel
    ​
Scenario: Add filter by one gene

	Given The "Main Table" for the WS dataset was open
	When user clicks the "+ Add Gene" button
	And "Gene" dialog is opened
	And User clicks any existing gene
	And clicks the "Apply" button
	Then Variants list should be filtered by selected gene
    ​
Scenario: Add filter by a few genes

	Given The "Main Table" for the WS dataset was open
	When user clicks the "+ Add Gene" button
	And "Gene" dialog is opened
	And user clicks a few existing genes
	And clicks the "Apply" button
	Then Variants list should be filtered by selected genes
    ​
Scenario: Edit filter

	Given A few genes were added
	When User clicks "+" button near selected Genes
	And adds/removes some Genes from the "Gene" dialog
	And clicks the "Apply" button
	Then Variants list should be filtered by newly selected genes
    ​
Scenario: Clear All

	Given A few genes were added
	When User clicks "+" button near selected Genes
	And clicks the "Clear all" button
	And clicks the "Apply" button
	Then All chosen genes should be cleared

Scenario: Cancel or "X"

	Given The "Main Table" for the WS dataset was open
	When User clicks the "+ Add Gene" button 
	And "Gene" dialog is opened
	And User adds a few existing genes
	And clicks the "Cancel" or "X" button
	Then variants should not be filtered by genes (no filter's changed)
    ​
Scenario: Search by valid gene name

	Given The "Main Table" for the WS dataset was open
	When user clicks the "+ Add Gene" button
	And "Gene" dialog is opened
	And User writes valid gene name in the Search field
	Then The gene should be searched
    ​
Scenario: Search by gene (substring)

	Given The "Main Table" for the WS dataset was open
	When user clicks the "+ Add Gene" button
	And "Gene" dialog is opened
	And User writes substring of the valid gene name in the Search field
	Then The gene should be searched
    ​
Scenario: Search by gene (lower-case)

	Given The "Main Table" for the WS dataset was open
	When user clicks the "+ Add Gene" button
	And "Gene" dialog is opened
	And User writes valid gene name with lower-case in the Search field
	Then The gene should be searched
    ​
Scenario: Search by gene (upper-case)

	Given The "Main Table" for the WS dataset was open
	When user clicks the "+ Add Gene" button
	And "Gene" dialog is opened
	And User writes valid gene name with upper-case in the Search field
	Then The gene should be searched
    
Scenario: Search by random row

	Given The "Main Table" for the WS dataset was open
	When User clicks the "+ Add Gene" button
	And "Gene" dialog is opened
	And User writes non-existing gene in the Search field
	Then Gene should not be found
