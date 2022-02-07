Feature: Use Case 1 S1
    As a Anfisa user I want to filter the "xl_PGP3140_wgs_NIST-4_2" dataset to create a derived dataset having 41 varinats

    Scenario: Open the Dataset info
        Given the "Dataset list" was opened
        When the user clicks the "xl_PGP3140_wgs_NIST-4_2" XL dataset in the left part of the page
        Then the information of the XL-dataset (the "Dataset info" page) should be opened 

    Scenario: Open the Decision Tree Panel
        Given the "xl_PGP3140_wgs_NIST-4_2" XL dataset info was opened
        When the user clicks the "Open in viewer" dropdown menu in the middle part of the page
        And clicks "Decision Tree Panel" in the dropdown menu
        Then the Decision Tree Panel should be opened
        And the total number of variants in the dataset shown in the top right corner as well as in the "Results" section should equal 5,628,753
        And the value format should be "5,628,753" (not "5628753")
        And the number of accepted variants should be 41

    Scenario: Load the "Hearing Loss, v.5" decision tree
        Given the "xl_PGP3140_wgs_NIST-4_2" XL dataset was opened in the Decision Tree Panel
        When the user clicks an arrow in the "Decision Trees" section in the top right part of the page
        And chooses the "Hearing Loss, v.5" decision tree in the dropdown menu
        Then the "Hearing Loss, v.5" decision tree should be loaded

    Scenario: Study step 5 of the decision tree
        Given the "xl_PGP3140_wgs_NIST-4_2" XL dataset was opened in the Decision Tree Panel
        And the "Hearing Loss, v.5" decision tree was loaded
        When the user scrolls down the decision tree in the right part of the page
        And finds "Step 5 (Num_Samples < 1)"
        And clicks at excluded variants ("-3" purple value)
        And clicks the expand button in the Filtering panel (left panel with graphs)
        Then graphs referred to 3 excluded variants should appear in the left part of the page

    Background:
        Given the "xl_PGP3140_wgs_NIST-4_2" XL dataset was opened in the Decision Tree Panel
        And the "Hearing Loss, v.5" decision tree was loaded
        And the user clicked at excluded variants ("-3" purple value)

    Scenario: Study the "Most_Severe_Consequence" graphs
        Given the user clicked the expand button in the Filtering panel (the left panel with graphs)
        When the user types "most" in the search field in the Filtering panel
        And studies the "Most_Severe_Consequence" graph in the "Variant" section
        Then the information about the variants' groups included in these attributes should be shown
        And the "Most_Severe_Consequence" graph should have 2 bars
        And the "deletion" bar should consist of 1 variant
        And the "insertion" bar should consist of 2 variants

    Scenario: Study the "Presence_in_Databases" graphs
        Given the user clicked the expand button in the Filtering panel (the left panel with graphs)
        When the user types "presence" in the search field in the Filtering panel
        And studies the "Presence_in_Databases" graph in the "Databases" section
        Then the information about the variants' groups included in these attributes should be shown
        And the "Presence_in_Databases" graph should have 1 bar
        And the "GnomAD" bar should consist of 2 variants

    Scenario: Study the "splice_altering" graphs
        Given the user clicked the expand button in the Filtering panel (the left panel with graphs)
        When the user types "splice" in the search field in the Filtering panel
        And studies the "splice_altering" graph in the "Predictions" section
        Then the information about the variants' groups included in these attributes should be shown
        And the "splice_altering" graph should have 1 bar
        And the "Not in HGMD" bar should consist of 3 variants

    Scenario: Study the "Region_Canonical" graphs
        Given the user clicked the expand button in the Filtering panel (the left panel with graphs)
        When the user types "region" in the search field in the Filtering panel
        And studies the "Region_Canonical" graph in the "Coordinates" section
        Then the information about the variants' groups included in these attributes should be shown
        And the "Region_Canonical" graph should have 3 bars
        And the "Other" bar should consist of 1 variant
        And the "intron" bar should consist of 2 variants
        And the "masked_repeats" bar should consist of 2 variants

    Scenario: Open the "View returned variants" popup menu
        Given the user clicked at excluded variants ("-3" purple value)
        When the user clicks the "View returned variants" button at the right corner of the page
        Then the "View returned variants" popup menu should be opened
        And the list of 3 variants should be at the left part of the menu

    Scenario: Study the "Quality" table of the first variant
        Given the "View returned variants" popup menu was opened
        When the user clicks at the first variant in the list
        And clicks the "Quality" table
        Then the table should expand
        And the rows such as "Title", "Variant Call Quality", "Read Depth", "FILTERs", "Genotype Quality", "Sample Genotype" should be seen
        And the columns should be title as the samples do (e.g. "All", "Mother", "Father", "Proband")
        And the table should, at least, partly filled

    Scenario: Study the "Quality" tables of other variants
        Given the "View returned variants" popup menu was opened
        And the "Quality" table was opened
        When the user clicks at the another variant in the list
        Then the "Quality" table should be opened for another variant

    Scenario Outline: Save the derived dataset
        Given the "View returned variants" popup menu was opened
        When the user closes the the "View returned variants" popup menu
        And clicks the "Save dataset" button
        And typed the <Dataset name> in the textbox
        And clicks the "Add dataset" button
        And clicks the "Open it" textbutton
        Then the Main table filled with new dataset variants should be seen
        And the number of variants there should be 41
    
      Example: 
          | <Dataset name>  |
          | Hearing_loss_v5 | 


