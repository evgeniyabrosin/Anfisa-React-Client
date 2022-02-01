Feature: Main Table
    Main table should be opened

    Scenario: Open Main Table
        Given Anfisa main page was loaded via link "https://anfisa.forome.dev/"
        When User clicks "PGP3140_wgs_panel_hl" dataset on the left panel
        And clicks "Open in viewer" dropdown
        And clicks "Main Table" in "Open in viewer" dropdown
        Then Main Table should be opened

    Scenario: Apply preset and make sure list is not empty
        Given Main Table was opened
        When User clicks Preset dropdown
        And chooses proper present
        Then present is applied

    Scenario: Chosen gene should be applied
        Given Main Table was opened
        When User chooses present with variants inside
        And Clicks on gene "+add"
        And Chooses gene
        And Clicks apply button
        Then Chosen gene should be applied

    Scenario: Custom tag should be added to the variant
        Given Main Table was opened
        When User Clicks on Variant
        And Clicks on Tags "+add" button in variants Table
        And Writes new Tag name in the field
        And Clicks "Add custom tag"
        And Clicks "Save Tags"
        Then The custom tag should be applied to the variant

    Scenario: Note should be added to the variant
        Given Main Table was opened
        When User Clicks on Variant
        And Clicks on Notes "+add" button in variants Table
        And Writes new note
        And Clicks Save note
        Then note should be added to variant

    Scenario: Main Table should be filtered by custom tag
        Given Custom tag was created
        When User clicks on Tag(s)
        And Choses custom tag which is created
        And Clicks apply
        Then Main table should be filtered by custom tag

    Scenario: Gene column should be turned off
        Given Main Table was opened
        When User clicks on "Customize Table" dropdown
        And toggles off "Gene" column
        And Clicks apply button
        Then Gene column should be turned off

    Scenario: Gene column should be turned on
        Given Main Table was opened
        When User clicks on "Customize Table" dropdown
        And toggles on "Gene" column
        And Clicks apply button
        Then Gene column should be turned on and displayed in the first place

    Scenario Outline: <Middle> column should be turned off
        Given Main Table was opened
        When User clicks on "Customize Table" dropdown
        And toggles off "<Middle>" column
        And Clicks apply button
        Then "<Middle>" column should be turned off

        Examples:
    <Middle>
    Protein Change
    In-Silico

    Scenario Outline: <Middle> column should be returned on itsprevious place
        Given Main Table was opened
        When User clicks on "Customize Table" dropdown
        And toggles on "<Middle>" column
        And Clicks apply button
        Then "<Middle>" column should be turned on

        Examples:
    <Middle>
    Protein Change
    In-Silico

    Scenario: Main Table view should be changed to compact view
        Given Main Table was opened
        When Clicks on "Customize Table" dropdown
        And Choses "Compact view"
        And Clicks apply button
        Then Main Table view should be changed to compact

    Scenario: The report should be exported is excel format
        Given Main Table was opened
        When user clicks "Export Report" dropdown
        And clicks on "Excel"
        Then Excel file should be downloaded

    Scenario: The report should be exported is csv format
        Given Main Table was opened
        When user clicks "Export Report" dropdown
        And clicks on "Csv"
        Then Csv file should be downloaded




