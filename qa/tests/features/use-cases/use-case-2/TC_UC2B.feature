Feature: Use Case 2 using the Filter Refiner
  As an Anfisa user I want to study data of the "Predictions" section

  Scenario: 1. Open the Dataset info
    Given the "Dataset list" was opened
    When the user clicks the "xl PF0005_WES" Dataset 
    Then the information of the XL-dataset (the "Dataset info" page) should be opened at the right part of the page   

  Scenario: 2. Open the Decision Tree Panel
    Given the "xl PF0005_WES" XL Dataset info was opened
    When the user clicks the "Open in viewer" dropdown menu at the middle part of the page
    And clicks the "Filter Refiner" option in the dropdown menu
    Then the Filter Refiner should be opened
    And the total number of variants in the dataset shown at the top right corner as well as in the "Result" section should equal 1,317,673
    And the value format should be "1,317,673" 

  Background: 
    Given The Filter Refiner referred to the "xl PF0005_WES" dataset was opened

  Scenario Outline: 3. Add "gnomAD_AF <= 0.05" attribute
    When the user types "gnom" in the search box of Filter Refiner
    And clicks "gnomAD_AF"
    And types <attribute value> in the field referred to the maximum value
    And clicks the "Add" button
    Then the "gnomAD_AF" attribute should appear in the Result section
    And the attribute value "gnomAD_AF <= 0.05" should be seen
    And the total number of derived dataset's variants shown in the "Result" section should equal "1,114,914"

    Example:
      | attribute value |
      | 0.05            |
      | 0,05            | 

  Scenario Outline: 4. Add the "Panels" ("Complement_System" subattribute) and the "Variant_in" ("PF" subattribute) attributes 
    Given the "gnomAD_AF" attribute was added to the Result section
    When the user clean the search field of the Filter Refiner
    And types <graphs name> 
    And clicks <attribute>
    And checks <subattribute> in the middle part of the page
    And clicks the "Add" button
    Then the <subattribute> should be added in the Result section
    And the total number of derived dataset's variants shown in the "Result" section should equal <num_variants> 

    Example:
      |graphs name | attribute  | subattribute      | num_variants |
      | pan        | Panels     | Complement_System | 2,331        |
      | var        | Variant_in | PF                | 2,020        | 

  Scenario Outline: 5. Study the graphs referred to "Complement_System" and "PF"
    Given the following attributes were added to the Result section:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Complement_System  |
      |Varian_in   |PF                 |   
    When the user types <graph name> in the search field of the Filter Refiner
    And clicks <graph>
    Then the <graph> is displayed 
    And the <graph> should have <num_subattributes> 
    And the <subattribute_1> should have <num_variants_1>
    And the <subattribute_2> should have <num_variants_2>
    
    Example: 
      | graph name | graph           | num_subattributes | subattribute_1 | num_variants_1 | subattribute_2   | num_variants_2 |
      | poly       | Polyphen_2_HVAR | 4                 | D              | 51             | B                | 86             |
      | poly       | Polyphen_2_HDIV | 4                 | D              | 61             | B                | 66             |
      | sift       | SIFT            | 5                 | deleterious    | 89             | Tolerated        | 87             |
      | fathmm     | FATHMM          | 3                 | D              | 38             | T                | 123            | 

  Scenario: 6. Replace the "PF" with the "Control" subattribute in the "Variant_in" attribute
    Given the following attributes were added to the Result section:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Complement_System  |
      |Varian_in   |PF                 |    
    When the user unchecks the "PF" box in the Result section
    And cleans the search field of the Filter Refiner
    And clicks "Variant_in"
    And checks the "Control" box 
    And clicks the "Add" button
    Then the "Control" subattributes should be added to the Result section
    And the total number of derived dataset's variants shown in the "Result" section should equal "461"

  Scenario Outline: 7. Study the graphs referred to "Complement_System" and "Control"
    Given the following attributes were added to the Result section:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Complement_System  |
      |Varian_in   |Control            |   
    When the user types <graph name> in the search field of the Filter Refiner
    And clicks <graph>
    Then the <graph> is displayed 
    And the <graph> should have <num_subattributes> 
    And the <subattribute_1> should have <num_variants_1>
    And the <subattribute_2> should have <num_variants_2>
    
    Example: 
      | graph name | graph           | num_subattributes | subattribute_1 | num_variants_1 | subattribute_2   | num_variants_2 |
      | poly       | Polyphen_2_HVAR | 4                 | D              | 20             | B                | 54             |
      | poly       | Polyphen_2_HDIV | 4                 | D              | 28             | B                | 41             |
      | sift       | SIFT            | 5                 | deleterious    | 50             | Tolerated        | 54             |
      | fathmm     | FATHMM          | 3                 | D              | 19             | T                | 79             |

  Scenario Outline: 8. Replace the "Complement_System" with the "Coagulation_System" subattribute in the "Panel" attribute
    Given the following attributes were added to the Result section:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <=" 0.05"|
      |Panels      |Complement_System  |
      |Varian_in   |Control            | 
    When the user unchecks the <subattribute_1> box in the Result section
    And cleans the search field of the Filter Refiner
    And types <name> instead
    And clicks <attribute>
    And checks the <subattribute_2> box in the middle part of the page
    And clicks the "Add" button
    Then the <subattribute_2> subattributes should be added to the Result section
    And the total number of derived dataset's variants shown in the "Result" section should equal <variants>
    
    Example:
      |subattribute_2    | name  | attribute | subattribute_2     | variants |
      |Complement_System | pan   | Panels    | Coagulation_System | 936      |
      |Control           | var   | Varian_in | PF                 | 805      |

  Scenario Outline: 9. Study the graphs referred to "Coagulation_System" and "PF"
    Given the following attributes were added to the Result section:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <="0.05" |
      |Panels      |Coagulation_System |
      |Varian_in   |PF                 |   
    When the user types <graph name> in the search field of the Filter Refiner
    And clicks <graph>
    Then the <graph> is displayed 
    And the <graph> should have <num_subattributes> 
    And the <subattribute_1> should have <num_variants_1>
    And the <subattribute_2> should have <num_variants_2>
    
    Example: 
      | graph name | graph           | num_subattributes | subattribute_1 | num_variants_1 | subattribute_2   | num_variants_2 |
      | poly       | Polyphen_2_HVAR | 4                 | D              | 35             | B                | 66             |
      | poly       | Polyphen_2_HDIV | 4                 | D              | 49             | B                | 49             |
      | sift       | SIFT            | 5                 | deleterious    | 65             | Tolerated        | 58             |
      | fathmm     | FATHMM          | 3                 | D              | 81             | T                | 36             |

  Scenario: 10. Replace the "PF" with the "Control" subattribute in the "Variant_in" attribute
    Given the following attributes were added to the Result section:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <="0.05" |
      |Panels      |Coagulation_System |
      |Varian_in   |PF                 | 
    When the user unchecks the "PF" box in the Result section
    And cleans the search field of the Filter Refiner
    And clicks the "Variant_in" attribute
    And checks the "Control" box in the middle part of the page
    And clicks the "Add" button
    Then the "Control" attribute should be added to the Result section
    And the total number of derived dataset's variants shown in the "Result" section should equal "160"

 Scenario Outline: 11. Study the graphs referred to "Coagulation_System" and "PF"
    Given the following attributes were added to the Result section:
      |Attribute   |Value              |
      |gnomAD_AF   |gnomAD_AF <="0.05" |
      |Panels      |Coagulation_System |
      |Varian_in   |Control            |   
    When the user types <graph name> in the search field of the Filter Refiner
    And clicks <graph>
    Then the <graph> is displayed 
    And the <graph> should have <num_subattributes> 
    And the <subattribute_1> should have <num_variants_1>
    And the <subattribute_2> should have <num_variants_2>
    
    Example: 
      | graph name | graph           | num_subattributes | subattribute_1 | num_variants_1 | subattribute_2   | num_variants_2 |
      | poly       | Polyphen_2_HVAR | 4                 | D              | 12             | B                | 30             |
      | poly       | Polyphen_2_HDIV | 4                 | D              | 16             | B                | 24             |
      | sift       | SIFT            | 5                 | deleterious    | 21             | Tolerated        | 30             |
      | fathmm     | FATHMM          | 3                 | D              | 33             | T                | 17             |

    
