Feature: Main table, Filter by Gene
    As the Anfisa user I want to filter variants list by Gene

    Scenario: Open the Main Table page
        Given The Main page was opened
        When User clicks an WS dataset
        And clicks the "Open in viewer" button
        And clicks the "Main Table" sub-menu
        Then The "Main Table" page should be opened
    ​
    Scenario: Genes are correspond to the dataset
        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene" section
        Then List of genes should be displayed
        And Genes should correspond to the dataset

    Scenario: Open Main Table page to another dataset
        Given The "Main table" for WS dataset was open
        When user back to the Main page screen
        And clicks another WS dataset
        And clicks the "Open in viewer" button
        And clicks the "Main Table" sub-menu
        Then The "Main Table" page should be opened
    ​
    Scenario: Genes are correspond to the dataset
        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene" section
        Then List of genes should be displayed
        And Genes should correspond to the dataset

    Scenario: Select a gene without applying
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And  User clicks a gene lists
        Then  Gene list should be checked but should not be added to the panel
    ​
    Scenario: Add filter by one gene
        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And User clicks any existed gene
        And clicks the "Apply" button
        Then Variants list should be filtered by selected gene
    ​
    Scenario: Add filter by a few genes
        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And user clicks a few genes
        And clicks the "Apply" button
        Then Variants list should be filtered by selected genes
    ​
    Scenario: Edit filter
        Given Some gene lists were added to the "Gene"
        When User clicks "Edit" button near "Gene"
        And adds/removes some Genes from the "Gene"
        And clicks the "Apply" button
        Then Variants list should be filtered by newly selected genes
    ​
    Scenario: Clear All
        Given Some Samples were added to the "Gene"
        When User clicks "Edit" button near "Gene"
        And clicks the "Clear all" button
        And clicks the "Apply" button
        Then All chosen genes should be cleared

    Scenario: Cancel
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And User adds a few genes
        And clicks the "Cancel" button
        Then variants should not be filtered by genes (no filter's changes)
    ​
    Scenario: Search by gene
        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And User enters existed gene in the Search field
        Then The gene should be searched
    ​
    Scenario: Search by gene (substring)
        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And User enters existed gene substring in the Search field
        Then  The gene should be searched
    ​
    Scenario: Search by gene (lower-case)
        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And  User enters existed gene with lowercase in the Search field
        Then  The gene should be searched
    ​
    Scenario: Search by gene (upper-case)
        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And  User enters existed gene with upper-case in the Search field
        Then  The gene should be searched
    ​
    Scenario: Search by random row
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And  User enters non-existed gene in the Search field
        Then  Entered gene should not be found