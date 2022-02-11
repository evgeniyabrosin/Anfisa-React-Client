Feature: Use Case 2 using the Decision Tree
  As a Anfisa user I want to study data of the "Predictions" section

  Scenario: 1. Open the Dataset info
    Given the "Dataset list" was opened
    When the user clicks the "xl PF0005_WES" Dataset 
    Then the information of the XL-dataset which displayed as the "Dataset info" page should be opened   

  Scenario: 2. Open Decision Tree Panel
    Given the "xl PF0005_WES" XL Dataset info was opened
    When the user clicks the "Open in viewer" dropdown menu at the middle part of the page
    And clicks the "Decision Tree Panel" option in the dropdown menu
    Then the Decision Tree Panel should be opened
    And the total number of variants in the dataset shown at the top right corner as well as under "Results" should equal "1,317,673"

  Background: 
    Given The Decision Tree Panel referred to the xl PF0005_WES dataset was opened

  Scenario Outline: 3. Add "gnomAD_AF" attribute
    When the user clicks the "Add attribute" button on Step 1
    And types <attribute name> in the Search field to find the section needed 
    And clicks the "gnomAD_AF" attribute
    And types <attribute value> in the field referred to the maximum value
    And clicks the "Add attribute" button
    Then the attribute should be added to Step 1
    And the "1,114,914" value in this particular format should appear near the green plus referred to Step 1

    Example: 
      | attribute name | attribute value | 
      | gnom           | 0.05            |
      | gnomAD         | 0,05            |
 
  Scenario Outline: 4.  Add the "Panels" ("Complement_System" subattribute) and the "Variant_in" ("PF" subattribute) attributes 
    Given the "gnomAD_AF" attribute is set to "gnomAD_AF <= 0.05"
    When the user clicks the "Add attribute" button on Step 1
    And types <att_name> in the Search field to find the section needed
    And clicks the <attribute> attribute
    And checks the <subattribute> box
    And clicks the "Add by joining" button
    And clicks the "Join by AND" option
    Then the attribute should be added to Step 1
    And the <value> value in this particular format should appear near the green plus referred to Step 1
  
  Example:
      | att_name   | attribute | subattribute      | value |
      | pan        | Panels    | Complement_System | 2,331 |
      | var        | Varian_in | PF                | 2,020 | 

  Scenario Outline: 5. Study the graphs referred to "Complement_System" and "PF"
    Given the following attributes are set in the Step 1:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Complement_System  |
      |Varian_in   |PF                 |
    When the user clicks at included variants which displayed as "+2,020" green value
    And clicks the expand button in the Filtering panel which is left panel with graphs 
    And cleans the search field in the Filtering panel
    And types <graph name> 
    Then the <graph> is displayed 
    And the <graph> should have <bars> 
    And the <bar_1> should have <num_variants_1>
    And the <bar_2> should have <num_variants_2>
    
    Example: 
      | graph name | graph           | bars | bar_1       | num_variants_1 | bar_2     | num_variants_2 |
      | poly       | Polyphen_2_HVAR | 4    | D           | 51             | B         | 86             |
      | poly       | Polyphen_2_HDIV | 4    | D           | 61             | B         | 66             |
      | sift       | SIFT            | 5    | deleterious | 89             | Tolerated | 87             |
      | fathmm     | FATHMM          | 3    | D           | 38             | T         | 123            | 

  Scenario: 6. Replace the "PF" with the "Control" subattribute in the "Variant_in" attribute
    Given the following attributes are set in the Step 1:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Complement_System  |
      |Varian_in   |PF                 |
    When the user clicks at the gear icon near the "Variant_in" attribute
    And uncheck "PF" box
    And checks the "control" box
    And clicks the "Save changes" button
    Then the "Control" attribute should replace the "PF" attribute
    And the "461" value should appear near the green plus referred to Step 1

  Scenario Outline: 7. Study the graphs referred to "Complement_System" and "Control"
    Given the following attributes are set in the Step 1:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Complement_System  |
      |Varian_in   |Control            |
    When the user clicks at included variants displayed as "+461" green value
    And clicks the expand button in the Filtering panel 
    And cleans the search field in the Filtering panel
    And types <graph name> 
    Then the the <graph> is displayed 
    And the <graph> should have <bars> 
    And the <bar_1> should have <num_variants_1>
    And the <bar_2> should have <num_variants_2>
    
    Example: 
      | graph name | graph           | bars | bar_1       | num_variants_1 | bar_2     | num_variants_2 |
      | poly       | Polyphen_2_HVAR | 4    | D           | 20             | B         | 54             |
      | poly       | Polyphen_2_HDIV | 4    | D           | 28             | B         | 41             |
      | sift       | SIFT            | 5    | deleterious | 50             | Tolerated | 54             |
      | fathmm     | FATHMM          | 3    | D           | 19             | T         | 79             | 

  Scenario: 8. Replace the "Control" with the "PF" subattribute in the "Variant_in" attribute and the "Complement_System" with the "Coagulation_System" subattribute in the "Panel" attribute
    Given the following attributes are set in the Step 1:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Complement_System  |
    When the user clicks at the gear icon near the "Variant_in" attribute
    And unchecks the "Control" box
    And checks the "PF" box
    And clicks the "Save changes" button
    And clicks at the gear icon near the "Panel" attribute
    And unchecks the "Complement_System" box
    And checks the "Coagulation_System" box
    And clicks the "Save changes" button
    Then the "PF" and the "Coagulation_System" attributes should replace the "Control" and "Complement_System" attributes respectively
    And the "805" value in this particular format should appear near the green plus referred to Step 1   

  Scenario Outline: 9. Study the graphs referred to "Coagulation_System" and "PF"
    Given the following attributes are set in the Step 1:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Coagulation_System |
      |Varian_in   |PF                 |
    When the user clicks at included variants displayed as  "+805" green value
    And clicks the expand button in the Filtering panel
    And cleans the search field in the Filtering panel
    And types <graph name> 
    Then the <graph> is displayed 
    And the <graph> should have <bars> 
    And the <bar_1> should have <num_variants_1>
    And the <bar_2> should have <num_variants_2>
    
    Example: 
      | graph name | graph           | bars | bar_1       | num_variants_1 | bar_2     | num_variants_2 |
      | poly       | Polyphen_2_HVAR | 4    | D           | 35             | B         | 66             |
      | poly       | Polyphen_2_HDIV | 4    | D           | 49             | B         | 49             |
      | sift       | SIFT            | 5    | deleterious | 65             | Tolerated | 58             |
      | fathmm     | FATHMM          | 3    | D           | 81             | T         | 36             | 

   Scenario: 10. Replace the "PF" with the "Control" subattribute in the "Variant_in" attribute
     Given the following attributes are set in the Step 1:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Coagulation_System |
      |Varian_in   |PF                 |
    When the user clicks the gear icon near the "Variant_in" attribute
    And unchecks the "PF" box
    And checks the "Control" box
    And clicks the "Save changes" button
    Then the "Control" attribute should replace "PF"
    And the "160" value should appear near the green plus referred to Step 1  

  Scenario Outline: 11. Study the graphs referred to the "Coagulation_System" and the "Control" subattributes
    Given the following attributes are set in the Step 1:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Coagulation_System |
      |Varian_in   |Control            |
    When the user clicks at included variants displayed as "+160" green value
    And clicks the expand button in the Filtering panel 
    And cleans the search field in the Filtering panel
    And types <graph name> 
    Then the <graph> is displayed 
    And the <graph> should have <bars> 
    And the <bar_1> should have <num_variants_1>
    And the <bar_2> should have <num_variants_2>
    
    Example: 
      | graph name | graph           | bars | bar_1       | num_variants_1 | bar_2     | num_variants_2 |
      | poly       | Polyphen_2_HVAR | 4    | D           | 12             | B         | 30             |
      | poly       | Polyphen_2_HDIV | 4    | D           | 16             | B         | 24             |
      | sift       | SIFT            | 5    | deleterious | 21             | Tolerated | 30             |
      | fathmm     | FATHMM          | 3    | D           | 33             | T         | 17             | 

