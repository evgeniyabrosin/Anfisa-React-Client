Feature: Use Case 3 using the Decision Tree
  As an Anfisa user I want to apply the "ACMG59 Variants" decision tree to study genes variants which are of the medical relevance 

  Scenario: 1. Open the Dataset info
    Given the "Dataset list" was opened
    When the user clicks the "xl_PGP3140_wgs_NIST-4_2" Dataset 
    Then the information of the XL-dataset which displayed as the "Dataset info" page should be opened   

  Scenario: 2. Open the Decision Tree Panel
    Given the "xl_PGP3140_wgs_NIST-4_2" XL Dataset info was opened
    When the user clicks the "Open in viewer" dropdown menu 
    And clicks the "Decision Tree Panel" option in the dropdown menu
    Then the Decision Tree Panel should be opened
    And the total number of variants in the dataset shown at the top right corner as well as under "Results" should equal "5,628,753"

  Background: 
    Given The Decision Tree Panel referred to the "xl_PGP3140_wgs_NIST-4_2" dataset was opened  

  Scenario: 3. Load the "ACMG59 Variants" decision tree
    When the user clicks an arrow in the "Decision Trees" section 
    And chooses the "ACMG59 Variants" decision tree in the dropdown menu
    Then the "ACMG59 Variants" decision tree should be loaded  
    And the number of accepted variants should equal "27"
    And the number of rejected variants should equal "5,628,726"
  
  Scenario Outline: 4. Save the derived dataset
    Given the "ACMG59 Variants" decision tree was applied
    When the user clicks the "Save dataset" button
    And types the <dataset name> in the textbox
    And clicks the "Add dataset" button
    And clicks the "Open it" textbutton
    Then the Main Table filled with new dataset variants should be seen
    And the number of variants there should be "27"

    Example: 
      | dataset name  |
      | ACMG_test_1   | 

  Scenario: 5. Apply filters via The Filter Refiner
    Given the derived dataset was opened in the Main table
    When the user clicks the "Edit Filters" button
    And types the <attribute name> in the search box
    And types <attribute value> in the box referred to the maximum value
    And clicks the "Add" button
    And clicks the "Apply" button
    Then the Main Table filled with variants should be seen
    And the number of variants there should be "7"

    Example:
      | attribute name | attribute value |
      | gnom           | 0.05            |
      | gnomAD_AF      | 0,05            |  

  Scenario Outline: 6. Create and add tags to variants: x1, x2, x3 ... (replace with real names!)  
    Given the filter was applied to the derived dataset
    When the user clicks at the <variant name> varinat  
    And clicks the "+Add" button in the "Tags" area
    And types the <tag name> in the textbox
    And clicks the "Add custom tag" button
    And clicks the "Save tags" button
    Then the custom tag should attach to the variant  
  
    Example:
      | variant name                  | tag name               |
      | [PCSK9] chr1:55518287         | likely benign          |
      | [APOB] chr2:21227496          | uncertain significance |
      | [WT1] chr11:32409550-32409557 | masked                 |


  Scenario Outline: 7. Add already existed tags to variants: x4, x5, x6 ... (replace with real names!)  
    Given the filter was applied to the derived dataset
    When the user clicks at the <variant name> varinat  
    And clicks the "+Add" button in the "Tags" area
    And checks the <tag> box
    And clicks the "Save tags" button
    Then the custom tag should attach to the variant    

    Example:
      | variant name                       | tag                      |
      | [TMEM43, XPC] chr3:14187171        | uncertain significance   |
      | [TSC2, PKD1] chr16:2138198-2138201 | uncertain significance   |
      | [SMAD4] chr18:48610382-48610383    | masked                   |
      | [DNAAF3, TNNI3] chr19:55670804     | likely benign            |


  Scenario Outline: 8. Add notes to variants custom tags 
    Given the filter was applied to the derived dataset
    When  the user clicks at the <variant name> variant 
    And the user clicks the "+Add" button in the "Tags" area
    And clicks the mesh near <tag> 
    And clicks the textbox to activate it
    And leaves a <note>
    And clicks the "Save notes" button
    Then the note should attach to the variant tag
  
    Example:
      | variant name                       | tag                    | note                                                                    |
      | [APOB] chr2:21227496               | uncertain significance | MS. 2/15/2022: not enough data                                          |
      | [TMEM43, XPC] chr3:14187171        | uncertain significance | MS. 2/15/2022: uncertain significance according to ClinVar              |
      | [TSC2, PKD1] chr16:2138198-2138201 | uncertain significance | MS. 2/15/2022: the criteria for benign and pathogenic are contradictory |
      | [DNAAF3, TNNI3] chr19:55670804     | likely benign          | MS. 2/15/2022: not present in HGMD and ClinVar, missense mutation       |

  Scenario Outline: 9. Export the report about variants having the "Uncertain significantly" tag in the "Excel" and the "Csv" files
    Given the filter was applied to the derived dataset
    And the drawer was opened
    When the user clicks the cross button to close the drawer
    And clicks the "+Add" button in the "Tag(s)" zone at the top middle part of the page
    And checks the "Uncertain significance" tag box
    And clicks the "Apply" button
    And clicks the "Export report" dropdown menu at the top right corner
    And clicks the <format file>
    Then variants having the "Uncertain significance" tag should be shown in the table 
    And the file should be downloaded to the user PC  

    Example:
      | format file | 
      | Exel        |  
      | Csv         |
