Feature: Main table, Apply filter and cross pages
# As An Anfisa user, I want to apply some filters and cross the pages from Main table

    Scenario: Open the Main table page
        Given Dataset list was opened
        When  the user clicks the "PGP3140_wgs_panel_hl" Dataset at the left part of the page
        And the user clicks the "Open in viewer" drop down menu at the middle part of the page
        And clicks the "Main table"  option in the drop down menu
        Then Main table of "PGP3140_wgs_panel_hl" dataset should be opened

    Scenario: Apply "Sample(s)" and "Gene List(s)" Filters
        Given Main table of "PGP3140_wgs_panel_hl" dataset was opened
        When User clicks "Sample(s)"
        And User chooses "Proband"
        And User clicks "Apply"
        And User clicks "Gene List(s)"
        And User chooses  "All_Hearing_Loss "
        And User clicks "Apply"
        Then chosen "Sample(s)" and "Gene List(s)" should be applied

    Scenario: Choose some filters Equal written and shown variants 
        Given Chosen "Sample(s)" and "Gene List(s)" were applied
        When User clicks "Gene(s)"
        And User choses "CCDC140" "CCDC181" "CCDC40" "CCDC50"  Genes
        And User clicks "Apply"
        And 13 Variants should be shown
        And User clicks "Edit Filters"
        And User searches "gnomAD_AF"
        And enters "MAX" Value  0.05
        And user clicks "Add"
        And User clicks "Apply"
        Then Variant number on the top of the page and Variants shown should be equal

    Scenario:  Choose preset and uncheck all the filters
        Given Main table of "PGP3140_wgs_panel_hl" dataset was opened
        When  User clicks "Preset" drop down menu
        And User chooses  "⏚BGM_Homozygous_Rec"
        And There are 2 Variants shown in the top of the screen of Main table
        And User clicks "Edit Filters"
        And User unchecks all the chosen Filters (Callers; Transcript_consequence; Transcript_biotype; Transcript_source)
        Then In "Filter Refiner" Variants should be filtered in the right side of the page

    Scenario: Apply filters and click "X" button without applying
        Given  Main table of "PGP3140_wgs_panel_hl" dataset was opened
        And 2592 Variants were shown
        When User clicks "Edit Filters"
        And User checks  "Rules"
        And Variants are filtered
        And 602 Variants are shown
        And User clicks close button (X)  without applying Filter
        Then Main page should be opened
        And There should be 2592 Variants shown again in the top of the screen

    Scenario: Choose Preset and uncheck Filter
        Given  Main table of "PGP3140_wgs_panel_hl" dataset was opened
        When  User clicks "Preset" drop- down menu
        And User chooses  "⏚Mendelian_Compound_Het " Preset
        And There are 7 Variants shown
        And User clicks "Edit Filters"
        And User unchecks Filter "Transcript_consequence"
        Then Variants should be filtered
        And Variants should be shown on the right side near the "Result" button in Filter Refiner (120)

    Scenario: Choose Decision tree from Filter refiner
        Given Chosen Preset (⏚Mendelian_Compound_Het)  and Filter (Rules)  were added
        When User clicks "Filtering Method" drop down menu
        And User clicks "Decision Tree" on drop down menu
        And Decision tree page is opened
        And User clicks "Decision Tree" drop down menu
        And Chooses Decision tree "⏚Trio Candidates"
        Then Decision Tree Should be opened
        And 120 Variants should be shown
   
    Scenario: Click "X" button two times from Decision tree 
        Given Decision Tree "⏚Trio Candidates" was applied
        And 120 Variants were shown
        When User clicks close button (X) on the right side of page
        And Filter Refiner is opened
        And User clicks close button (X) on the right side of page one more time
        Then Main table of Dataset should be opened

    Scenario: Choose preset, uncheck filter and click apply
        Given  Main table of "PGP3140_wgs_panel_hl" dataset was opened
        When  User clicks "Preset" drop down menu
        And User chooses "⏚SEQaBOO_Hearing_Quick" Preset
        And There are 17 Variants shown
        And User clicks "Edit Filters"
        And User unchecks "Rules" Filter
        And clicks "Apply"
        Then Variants should be Filtered
        And 2592 Variants should be shown in the top of the Main Table screen

    Scenario: Check unchecked filter again and click apply
        Given Filter "Rules" was unchecked
        And Filtered 2592 Variants were shown
        When User clicks "Edit Filters"
        And click "Rules" again
        And choose "⏚Hearing Loss Quick" Filter again
        And clicks "Apply"
        Then Variants amount should be Filtered
        And 17 Variants should be shown again


