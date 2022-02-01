Feature: Main table, Filter by Gene
  As the Anfisa user I want to filter variants list by Gene
 
    Scenario: Open the Main Table page
        Given The Main page is open
        When User clicks an WS dataset
        And click the Open in viewer button
        And click the Main Table sub-menu
        Then The Main Table should be opened
    Scenario: Genes are correspond to the dataset
        Given The main table for WS dataset is opened
        When user clicks the "Add" button under Gene section
        Then List of genes should be displayed
        And Genes should correspond to the dataset
        
    Scenario: Open Main Table page to another dataset
        Given The main table for WS dataset is opened
        When user back to the Main page screen
        And click another WS dataset
        And click the Open in viewer button
        And click the Main Table sub-menu
        Then The Main Table should be opened
    Scenario: Genes are correspond to the dataset
        Given The main table for WS dataset is opened
        When user clicks the "Add" button under Gene section
        Then List of genes should be displayed
        And Genes should correspond to the dataset
    Scenario: Filter by Gene
        Given The main table of X dataset is opened
        When User clicks the "Add" button under "Gene"
        And Gene dialog is opened
        And clicks any existed gene
        And clicks "Apply"
        Then Variants list should be filtered by selected gene
    Scenario: Check a few genes
        Given The main table of the X dataset is opened
        When User clicks the "Add" button under "Gene"
        And gene dialog is opened
        And user clicks a few genes
        Then Chosen genes should be checked but should not be added to the panel.
        
    Scenario: Check a few genes
        Given The main table of the X dataset is opened
        When User clicks the "Add" button under "Gene"
        And gene dialog is opened
        And user clicks a few genes
        And clicks "Apply"
        Then Variants list should be filtered by selected genes
    Scenario: Search by gene
        Given The main table of the X dataset is opened
        When User clicks the "Add" button under "Gene"
        And  gene dialog is opened
        And User writes existed gene in the search field
        Then The gene should be searched
    Scenario: Search by gene (substring)
        Given The main table of the X dataset is opened
        When User clicks the "Add" button under "Gene"
        And  gene dialog is opened
        And User writes existed gene substring in the search field
        Then  The gene should be searched
    Scenario: Search by gene (lower-case)
        Given The main table of the X dataset is opened
        When User clicks the "Add" button under "Gene"
        And gene dialog is opened
        And  User writes existed gene with lowercase in the search field
        Then  The gene should be searched
    Scenario: Clear All Genes
        Given The main table of the X dataset is opened
        When User clicks the "Add" button under "Gene"
        And  gene dialog is opened
        And User chooses some existed genes
        And genes are added to the gene field
        And User clicks "Clear all"
        Then  all chosen genes should be cleared.
    Scenario: user checks a few genes in the list and clicks Apply button
        Given The main table of the X dataset is opened
        When User clicks the "Add" button under "Gene"
        And  gene dialog is opened
        And user clicks a few genes
        And clicks the "Apply" button
        Then Variants list should be filtered by selected genes.
    Scenario: Cancel selected genes
        Given The main table of the X dataset is opened
        When User clicks the "Add" button under "Gene"
        And gene dialog is opened
        And User adds few genes
        And User clicks "Cancel"
        Then all applied changes are canceled
        And previous applied genes are not removed