Feature: Main table, Filter by Gene Lists
    As the Anfisa user I want to filter variants list by Gene lists

    Scenario: Open the Main Table page

        Given The Main page was open
        When User clicks a WS dataset
        And clicks the "Open in viewer" button
        And clicks the "Main Table" sub-menu
        Then The "Main Table" page should be opened
    ​
    Scenario: Gene lists are correspond to the dataset

        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene list" section
        Then List of Gene List should be displayed
        And Gene lists should correspond to the dataset
    ​
    Scenario: Open Main Table page to another dataset

        Given The "Main table" for WS dataset was open
        When user goes back to the Main page screen
        And clicks another WS dataset
        And clicks the "Open in viewer" button
        And clicks the "Main Table" sub-menu
        Then The "Main Table" page should be opened
    ​
    Scenario: Gene lists are correspond to the dataset

        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Gene list" section
        Then List of Gene List should be displayed
        And Gene lists should correspond to the dataset

    Scenario: Select a gene list without applying

        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene list" section
        And the "Gene List" dialog is opened
        And  User clicks one of the gene lists
        Then  Gene list should be checked but should not be added to the panel

    Scenario: Add filter by one gene list

        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene list" section
        And the "Gene List" dialog is opened
        And User clicks one gene list
        And clicks the "Apply" button
        Then Variants list should be filtered by selected genes list
    ​
    Scenario: Add filter by a few gene lists

        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene list" section
        And the "Gene List" dialog is opened
        And  User clicks a few gene lists
        And  clicks the "Apply" button
        Then Variants list should be filtered by selected genes lists

    Scenario: Edit filter

        Given Some gene lists were added to the "Gene list"
        When User clicks "Edit" button near "Gene list"
        And adds/removes some Genes from the "Gene list"
        And clicks the "Apply" button
        Then Variants list should be filtered by newly selected genes list

    Scenario: Clear All

        Given Some gene lists were added to the "Gene list"
        When User clicks "Edit" button near "Gene list"
        And clicks the "Clear all" button
        And clicks the "Apply" button
        Then All chosen gene lists should be cleared
    ​
    Scenario: Cancel

        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene list" section
        And the "Gene List" dialog is opened
        And User adds a few gene lists
        And clicks the "Cancel" button
        Then variants should not be filtered by gene lists (no filter's changes)
    ​
    Scenario: Search by gene list

        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene list" section
        And the "Gene List" dialog is opened
        And  User enters existed gene list in the Search field
        Then  The gene list should be found
    ​
    Scenario: Search by gene list (substring)

        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene list" section
        And the "Gene List" dialog is opened
        And User enters existed gene list substring in the Search field
        Then The gene list should be found
    ​
    Scenario: Search by gene list (lower-case)

        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene list" section
        And the "Gene List" dialog is opened
        And  User enters existed gene list with lowercase in the Search field
        Then  The gene list should be found
    ​
    Scenario: Search by gene list (upper-case)

        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene list" section
        And the "Gene List" dialog is opened
        And  User enters existed gene list with uppercase in the Search field
        Then  The gene list should be found

    Scenario: Search by random row

        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene list" section
        And the "Gene List" dialog is opened
        And  User enters non-existed gene list in the Search field
        Then  Entered gene list should not be found