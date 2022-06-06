Feature: Main table, Apply filter and cross pages
# As An Anfisa user, I want to apply some filters and cross the pages from Main table

    Scenario: 01 Open the Main table page
        Given Dataset list was opened
        When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
        And the user clicks the "Open in viewer" drop down menu at the middle part of the page
        And clicks the "Main table"  option in the drop down menu
        Then Main table of "PGP3140_wgs_panel_hl" dataset should be opened

    Scenario: 02 Apply "Sample(s)" and "Gene List(s)" Filters
        Given Main table of "PGP3140_wgs_panel_hl" dataset was opened
        When User clicks "+ Add Sample"
        And User checks "Proband"
        And User clicks "Apply"
        And User clicks "+ Add Gene List"
        And User checks  "All_Hearing_Loss "
        And User clicks "Apply"
        Then chosen Sample and Gene List should be applied

    Scenario: 03 Choose some filters Equal written and shown variants 
        Given Chosen "Sample(s)" and "Gene List(s)" were applied
        When User clicks "+ Add Gene"
        And User checks "CCDC140" "CCDC181" "CCDC40" "CCDC50"  Genes
        And User clicks "Apply"
        And 13 Variants should be shown
        And User clicks "Edit Filters"
        And User searches "gnomAD_AF"
        And enters "MAX" Value  0.05
        And user clicks "+ Add Attribute"
        And User clicks "Apply"
        Then Variant number on the top of the page and Variants shown should be equal

    Scenario: 04 Choose preset and uncheck all the filters
        Given Main table of "PGP3140_wgs_panel_hl" dataset was opened
        When  User clicks "Select Preset" drop down menu
        And User chooses  "⏚BGM_Homozygous_Rec"
        And There are 2 Variants shown in the top of the screen of Main table
        And User clicks "Edit Filters"
        And User clicks "Clear all" at the right column of Filter refiner
        Then In "Filter Refiner" Variants should be filtered in the right side of the page
        And 2592 variants should be shown

    Scenario: 05 Apply filters and click "X" button without applying
        Given  Main table of "PGP3140_wgs_panel_hl" dataset was opened
        And 2592 Variants were shown
        When User clicks "Edit Filters"
        And User clicks  "Callers" Filter
        And User chooses "BGM_AUTO_DOM" subfilter
        And clicks "+Add attribute" button
        And Variants are filtered
        And 9 Variants are shown
        And User clicks close button (X)  without applying Filter
        Then Main page of anfisa should be opened
        

    Scenario: 06 Choose Preset and uncheck Filter
        Given  Main table of "PGP3140_wgs_panel_hl" dataset was opened
        When  User clicks "Select Preset" drop- down menu
        And User chooses  "⏚Mendelian_Compound_Het " Preset
        And There are 7 Variants shown
        And User clicks "Edit Filters"
        And User clicks setting (Three dots) button for "benign" filter
        And clicks "Delete"
        Then Variants should be filtered
        And Variants should be shown on the right side near the "Result" button in Filter Refiner (48)

    Scenario: 07 Choose Decision tree from Filter refiner
        Given Preset (⏚Mendelian_Compound_Het)  and Filter (Callers)  were added
        When User clicks "Filtering Method" drop down menu
        And User clicks "Decision Tree" on drop down menu
        And Decision tree page is opened
        And User clicks "Select Decision Tree" drop down menu
        And Chooses Decision tree "⏚Trio Candidates"
        And Clicks "Apply Filter" button
        Then Decision Tree Should be opened
        And 120 Variants should be shown
   

    Scenario: Choose preset, uncheck filter and click apply
        Given  Main table of "PGP3140_wgs_panel_hl" dataset was opened
        When  User clicks "Select Preset" drop down menu
        And User chooses "⏚SEQaBOO_Hearing_Quick" Preset
        And There are 17 Variants shown
        And User clicks "Edit Filters"
        And User deletes "Rules" Filter
        And clicks "Apply"
        Then Variants should be Filtered
        And 2592 Variants should be shown in the top of the Main Table screen

    Scenario: Check unchecked filter again and click apply
        Given Filter "Rules" was unchecked
        And Filtered 2592 Variants were shown
        When User clicks "Edit Filters"
        And click "+" button near "Rules" again
        And checks "⏚Hearing Loss Quick" Filter again
        And clicks "+Add attribute"
        Then Variants amount should be Filtered
        And 17 Variants should be shown again


