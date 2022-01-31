Feature: Main table, Filter by Tag
    As the Anfisa user I want to filter variants list by Tag

    Scenario: Open the Main Table page
        Given The Main page was open
        When User clicks a WS dataset
        And clicks the "Open in viewer" button
        And clicks the "Main Table" sub-menu
        Then The "Main Table" page should be opened
    ​
    Scenario: Tags are correspond to the dataset
        Given The "Main table" for WS dataset was open
        When user clicks the "Add" button under the "Tag" section
        Then List of Tags should be displayed
        And Tags should correspond to the dataset

    Scenario: Open Main Table page to another dataset
        Given The "Main table" for WS dataset was open
        When user back to the Main page screen
        And clicks another WS dataset
        And clicks the "Open in viewer" button
        And clicks the "Main Table" sub-menu
        Then The "Main Table" page should be opened
    ​
    Scenario: Tags are correspond to the dataset
        Given The "Main table" for WS dataset was open
        When User clicks the "Add" button under the "Tag" section
        Then List of tags should be displayed
        And Tags should correspond to the dataset
    ​
    Scenario: Select a tag without applying
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button the "Tag" section
        And "Tag" dialog is opened
        And user chooses a few Tags
        Then Chosen Tags should be checked but should not be added to the panel

    Scenario: Add filter by one tag
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And user clicks any existed tag
        And clicks the "Apply" button
        Then ariants list should be filtered by selected tag
    ​
    Scenario: Add filter by a few tags
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And user clicks a few Tags
        And clicks the "Apply" button
        Then Variants list should be filtered by selected tags.
    ​
    Scenario: Edit filter
        Given Some Tags were added to the "Tag"
        When User clicks "Edit" button near "Tag"
        And adds/removes some tags from the "Tag"
        And clicks the "Apply" button
        Then Variants list should be filtered by newly selected tags

    Scenario: NOT mode
        Given The "Main table" of the WS dataset was open
        When  User clicks the "Add" button under "Tag"
        And the "Tag" dialog is opened
        And User clicks "NOT Mode"
        And clicks a tag
        And clicks the "Apply" button
        Then Variants without selected tag should be displayed

    Scenario: Variants with notes only
        Given The "Main table" of the WS dataset was open
        When  User clicks the "Add" button under "Tag"
        And the "Tag" dialog is opened
        And User clicks "Variants with notes only"
        And clicks the "Apply" button
        Then Only variants with notes should be displayed
    ​
    Scenario: Variants with notes only + Not mode
        Given The "Main table" of the WS dataset was open
        When  User clicks the "Add" button under "Tag"
        And the "Tag" dialog is opened
        And User clicks "Variants with notes only"
        And clicks "NOT Mode"
        And User clicks "NOT Mode"
        And clicks a tag
        And clicks the "Apply" button
        Then Only variants with notes and without checked variant should be displayed
    ​
    Scenario: Clear All
        Given Some tags were added to the "Tag"
        When User clicks "Edit" button near "Tag"
        And clicks the "Clear all" button
        And clicks the "Apply" button
        Then All chosen tags should be cleared

    Scenario: Cancel
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And User adds a few tags
        And clicks the "Cancel" button
        Then variants should not be filtered by tags (no filter's changes)

    Scenario: Search by Tag
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And User enters existed Tag in the Search field
        Then The Tag should be found
    ​
    Scenario: Search by Tag (substring)
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And User enters existed Tag substring in the Search field
        Then The Tag should be found

    Scenario: Search by Tag (lower-case)
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And User enters existed Tag with lowercase in the Search field
        Then  The Tag should be found
    ​
    Scenario: Search by Tag (upper-case)
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And  User enters existed Tag with uppercase in the Search field
        Then  The Tag should be found
    ​
    Scenario: Search by random row
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Tag" section
        And  Tag  dialog is opened
        And  User enters non-existed Tag in the search field
        Then  Entered Tag should not be found