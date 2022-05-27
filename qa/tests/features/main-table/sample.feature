Feature: Main table, Filter by Sample
    As the Anfisa user I want to filter variants list by Sample

    Scenario: Open the Main Table page

        Given The Main page was opened
        When User clicks a WS dataset
        And clicks the "Open in viewer" button
        And clicks the "Main Table" sub-menu
        Then The "Main Table" page should be opened
    ​
    Scenario: Genes are correspond to the dataset

        Given The "Main table" for WS dataset was open
        When user clicks the "+ Add Sample" button 
        Then List of samples should be displayed
        And Samples should correspond to the dataset

    Scenario: Open Main Table page to another dataset

        Given The "Main table" for WS dataset was open
        When  user Clicks Forome logo to go to the Main page screen
        And clicks another WS dataset
        And clicks the "Open in viewer" button
        And clicks the "Main Table" sub-menu
        Then The "Main Table" page should be opened
    ​
    Scenario: Genes are correspond to the dataset

        Given The "Main table" for WS dataset was open
        When user clicks the "+ Add Sample" button 
        Then List of Samples should be displayed
        And Samples should correspond to the dataset

    Scenario: Select a gene without applying

        Given The "Main table" of the WS dataset was open
        When User clicks the "+ Add Sample" button 
        And the "Sample" dialog is opened
        And  User clicks a Sample
        Then Sample should be checked but should not be added to the panel
    ​
    Scenario: Add filter by one gene

        Given The "Main table" for WS dataset was open
        When user clicks the "+ Add Sample" button 
        And the "Sample" dialog is opened
        And User clicks any existed Sample
        And clicks the "Apply" button
        Then Variants list should be filtered by selected Sample
    ​
    Scenario: Add filter by a few genes

        Given The "Main table" for WS dataset was open
        When user clicks the "+ Add Sample" button 
        And the "Sample" dialog is opened
        And user clicks a few Samples
        And clicks the "Apply" button
        Then Variants list should be filtered by selected Samples
    ​
    Scenario: Edit filter

        Given Some Samples were added to the "Sample"
        When User clicks "+" button near "Sample"
        And Checks/Unchecks some Samples 
        And clicks the "Apply" button
        Then Variants list should be filtered by newly selected Samples
    ​
    Scenario: Clear All

        Given Some Samples were added to the "Sample"
        When User clicks "+" button near "Sample"
        And clicks the "Clear all" button
        And clicks the "Apply" button
        Then All chosen Samples should be cleared

    Scenario: Cancel

        Given The "Main table" of the WS dataset was open
        When User clicks the "+ Add Sample" button 
        And the "Sample" dialog is opened
        And User adds a few Samples
        And clicks the "Cancel" button
        Then variants should not be filtered by Samples (no filter's changes)
    ​
    Scenario: Search by Sample

        Given The "Main table" for WS dataset was open
        When user clicks the "+ Add Sample" button 
        And the "Sample" dialog is opened
        And User enters existed Sample in the Search field
        Then The Sample should be searched
    ​
    Scenario: Search by Sample (substring)

        Given The "Main table" for WS dataset was open
        When user clicks the "+ Add Sample" button 
        And the "Sample" dialog is opened
        And User enters existed Sample substring in the Search field
        Then  The Sample should be searched
    ​
    Scenario: Search by Sample (lower-case)

        Given The "Main table" for WS dataset was open
        When user clicks the "+ Add Sample" button 
        And the "Sample" dialog is opened
        And  User enters existed Sample with lowercase in the Search field
        Then  The Sample should be searched
    ​
    Scenario: Search by Sample (upper-case)

        Given The "Main table" for WS dataset was open
        When user clicks the "+ Add Sample" button 
        And the "Sample" dialog is opened
        And User enters existed Sample with upper-case in the Search field
        Then The Sample should be searched
    
     Scenario: Search by random row

        Given The "Main table" of the WS dataset was open
        When User clicks the "+ Add Sample" button 
        And the "Sample" dialog is opened
        And  User enters non-existed Sample in the Search field
        Then  Entered Sample should not be found


     Scenario:  Choose few samples and reload
        Given The main table of the X dataset is opened
        When User clicks the "+ Add Sample" button 
        And Sample dialog is opened
        And user chooses  a few Samples
        And reloads the page
        Then Chosen Samples should not be added