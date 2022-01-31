Feature: Main table, Dataset Creation
  As the Anfisa user I want to create a new dataset based on the variants on the Main Table page
    Scenario: Save a new dataset
        Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
        When user chooses the "⏚SEQaBOO_Hearing_Loss_v_5" preset
        and user clicks "Save dataset"
        and writes name valid for the dataset
        and clicks "Add dataset"
        Then Dataset should be saved
    Scenario: Save a new dataset with applied filters
        Given Main Table for the "PGP3140_wgs_panel_hl" dataset is open
        When user chooses the "⏚SEQaBOO_Hearing_Loss_v_5" preset
        and user clicks the "Edit filters" button
        and clicks the "Callers" attribute
        and chooses the "BGM_CMPD_HET" value
        and clicks the "Add" button
        and clicks the "Apply" button
        and user clicks "Save dataset"
        and writes name for the dataset
        and clicks "Add dataset"
        Then Dataset should be saved
    Scenario: Save a new dataset with applied preset
        Given The main table of the dataset
        When user chooses any Preset with variants
        And clicks "Save dataset"
        And writes name for the dataset
        And clicks "Add dataset"
        Then dataset should be saved
    Scenario: Save dataset with more than 2000 variants
        Given The main table of the dataset
        When  user chooses any Preset with more than 2000 variants
        And clicks "Save dataset"
        And writes name for the dataset
        And clicks "Add dataset"
        Then Dataset should be saved.
        
    Scenario: Save a new dataset without any applied filters
        Given The main table of the dataset
        When User clicks save dataset without applying Filter Preset or Filter Refiner condition
        Then User should not be able to save dataset
    Scenario: Save a new dataset with filter by Gene and preset
        Given The main table of the dataset
        When user chooses any Preset with variants
        And User chooses one of the existed genes
        And clicks "Save dataset"
        And writes name for the dataset
        And clicks "Add dataset"
        Then dataset should be saved
    Scenario: Save a new dataset with filter by Gene List and preset
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And User chooses one of the existed gene list
        And clicks "Save dataset"
        And writes name for the dataset
        And clicks "Add dataset"
        Then dataset should be saved
    Scenario: Save a new dataset with filter by Sample and preset
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And User chooses one of the existed Sample
        And clicks "Save dataset"
        And writes name for the dataset
        And clicks "Add dataset"
        Then dataset should be saved
    Scenario: Save a new dataset with filter by Tag and preset
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And User chooses one of the existed Tag
        And clicks "Save dataset"
        And writes name for the dataset
        And clicks "Add dataset"
        Then dataset should be saved
    Scenario: Try to create a dataset without name
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And clicks "Save dataset"
        And writes no name for the dataset
        And clicks "Add dataset"
        Then dataset should not be saved
        and User is unable to click "Add dataset" when there is not name written
    Scenario: Try to create a dataset with duplicated name (dataset with this name already exists)
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And clicks "Save dataset"
        And writes name for the dataset that already exists
        And clicks "Add dataset"
        Then The user shouldn't be able to create a dataset with duplicated name.
    Scenario: Try to create a dataset with long name (more than 250 chars)
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And clicks "Save dataset"
        And writes the name for a dataset with more than 250 characters.
        And clicks "Add dataset"
        Then dataset should not be saved.
        
    Scenario: Try to create dataset with spaces in the name
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And clicks "Save dataset"
        And writes name for a dataset with Space
        And user clicks "Add dataset"
        Then the dataset should not be saved
        
    Scenario: Try to create dataset with special chars in the name
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And clicks "Save dataset"
        And writes name for dataset with special character( -_+)
        And user clicks "Add dataset"
        Then the dataset should not be saved
    
    Scenario: Try to create dataset with name that begins from a number
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And clicks "Save dataset"
        And writes name for the dataset which begins with a number (5asd)
        And user clicks "Add dataset"
        Then the dataset should not be saved
    Scenario: Cancel dataset 
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And clicks "Save dataset"
        And writes name for the dataset
        And clicks "Cancel"
        Then dataset should be canceled
    Scenario: Creation dataset process cannot be canceled
        Given The main table of the dataset
        When  user chooses any Preset with variants
        And clicks "Save dataset"
        And enters a valid name for the dataset
        And clicks "Add dataset"
        And Create dialog is shown
        And user clicks "Cancel" or "X" button
        Then creation process should not be canceled