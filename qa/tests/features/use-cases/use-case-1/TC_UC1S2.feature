Feature: Use Case 1 S2
  As a Anfisa user I want to study the dataset derived from the "xl_PGP3140_wgs_NIST-4_2" dataset and created in TC_UC1S2 
  to download 2 uncertaint variants for secondary review  in the "Excel" and the "Csv" files. 
  
  Scenario: Load the ""⏚SEQaBOO_Hearing_Quick" preset 
    Given the Main Table of the newly derived dataset was opened
    When the user clicks the "Select..." dropdown menu located in the "Preset" zone
    And scrolls the menu down
    And clicks the "⏚SEQaBOO_Hearing_Quick" preset
    Then the "⏚SEQaBOO_Hearing_Quick" preset should be applied
    And the number of variants shown at the top right corner should be decreased to 24

  Scenario: Apply the "Proband" filter of the "Sample(s)" zone
    Given the Main Table of the newly derived dataset was opened
    And the "⏚SEQaBOO_Hearing_Quick" preset was applied  
    When the user clicks on "+Add" button located in "Sample(s)" zone
    And checks the "Proband" box
    And clicks the "Apply" button
    Then 8 variants only referred to the proband should be shown 

  Scenario: Configure the tables in the drawer
    Given the Main Table of the newly derived dataset was opened
    And the "⏚SEQaBOO_Hearing_Quick" preset was applied
    And the "Proband" option in the "Sample" zone was chosen
    When the user clicks on the row of the first "KIT[chr4:54727298 A>C]" variant
    And changes the size of the tables in the drawer opened by pressing, holding, and moving the 
    botton right corner of the following tables: "General", "gnomAD", "Databases", "Quality", "Predictions", "Bioinformatics"
    And changes the order of the tables by clicking and dragging the drag-and-drop button at the top right corner of the tables
    Then the user should configure the tables of the drawer to simultaneously study informations of the following tables:
    "General", "gnomAD", "Databases", "Quality", "Predictions", "Bioinformatics"
  
  Background: 
    Given the Main Table of the newly derived dataset was opened
    And the "⏚SEQaBOO_Hearing_Quick" preset was applied
    And the "Proband" option in the "Sample" zone was chosen 
    And the tables of the drawer were configured to let the user simultaneously study informations of the following tables:
    "General", "gnomAD", "Databases", "Quality", "Predictions", "Bioinformatics"

  Scenario: (1) Create and add the "Likely Benign" tag to the "KIT[chr4:54727298 A>C]" variant  
    Given the drawer for the "KIT[chr4:54727298 A>C]" variant was opened
    When the user clicks the "+Add" button in the "Tags" area
    And types the "Likely Benign" tag name in the textbox
    And clicks the "Add custom tag" button
    And clicks the "Save tags" button
    Then the custom tag should attach to the variant

  Scenario: Add a note to the "KIT[chr4:54727298 A>C]" variant  
    Given the drawer for the "KIT[chr4:54727298 A>C]" variant was opened
    When the user clicks the "+Add" button in the "Notes" area
    And clicks the textbox to activate it
    And leaves a note: "MS, 11/10/21: DM in HGMD but benign in ClinVar, common in AS"
    And clicks the "Save note" button
    Then the note should attach to the variant 

  Scenario: (2) Create and add the "For secondary review" tag to the "BDP1[chr5:71522350 G>C]" variant  
    Given the drawer for the "KIT[chr4:54727298 A>C]" variant was opened
    When the user clicks the "BDP1[chr5:71522350 G>C]" varinat in the left list 
    And clicks the "+Add" button in the "Tags" area
    And types the "For secondary review" tag name in the textbox
    And clicks the "Add custom tag" button
    And clicks the "Save tags" button
    Then the custom tag should attach to the variant

  Scenario: Add a note to the "BDP1[chr5:71522350 G>C]" variant  
    Given the drawer for the "BDP1[chr5:71522350 G>C]" variant was opened
    When the user clicks the "+Add" button in the "Notes" area
    And clicks the textbox to activate it
    And leaves a note: "MS, 11/10/21: more common in Ashkenazi Jews than in other populations, is not present in ClinVar"
    And clicks the "Save note" button
    Then the note should attach to the variant   

  Scenario: (3) Add the "Likely Benign" tag to the "KCNQ1[chr11:2847958 C>T]" variant  
    Given the drawer for the "BDP1[chr5:71522350 G>C]" variant was opened
    When the user clicks the "KCNQ1[chr11:2847958 C>T]" varinat in the left list 
    And clicks the "+Add" button in the "Tags" area
    And scrolls the tags list down
    And checks the "Likely Benign" tag box
    And clicks the "Save tags" button
    Then the tag should attach to the variant

  Scenario: Add a note to the "KCNQ1[chr11:2847958 C>T]" variant  
    Given the drawer for the "KCNQ1[chr11:2847958 C>T]" variant was opened
    When the user clicks the "+Add" button in the "Notes" area
    And clicks the textbox to activate it
    And leaves a note: "MS, 11/10/21: DM in HGMD but benign in ClinVar, common in AS"
    And clicks the "Save note" button
    Then the note should attach to the variant   

  Scenario: (4) Add the "For secondary review" tag to the "KBTBD4, NDUFS3[chr11:47580858 G>C]" variant  
    Given the drawer for the "KCNQ1[chr11:2847958 C>T]" variant was opened
    When the user clicks the "KBTBD4, NDUFS3[chr11:47580858 G>C]" varinat in the left list 
    And clicks the "+Add" button in the "Tags" area
    And scrolls the tags list down
    And checks the "For secondary review" tag box
    And clicks the "Save tags" button
    Then the tag should attach to the variant

  Scenario: Add a note to the "KBTBD4, NDUFS3[chr11:47580858 G>C]" variant  
    Given the drawer for the "KBTBD4, NDUFS3[chr11:47580858 G>C]" variant was opened
    When the user clicks the "+Add" button in the "Notes" area
    And clicks the textbox to activate it
    And leaves a note: "MS, 11/10/21:  coding in NDUFS3 only, a very rare variant that does not have any clinical
     annotations, but  It does have damaging in-silico predictions from Polyphen and SIFT"
    And clicks the "Save note" button
    Then the note should attach to the variant     

  Scenario: (5) Add the "Likely Benign" tag to the "CABP2[chr11:67522626 C>T]" variant  
    Given the drawer for the "KBTBD4, NDUFS3[chr11:47580858 G>C]" variant was opened
    When the user clicks the "CABP2[chr11:67522626 C>T]" varinat in the left list 
    And clicks the "+Add" button in the "Tags" area
    And scrolls the tags list down
    And checks the "Likely Benign" tag box
    And clicks the "Save tags" button
    Then the tag should attach to the variant

  Scenario: (6) Create and add the "Polyphen HDIV D” and the "Likely Benign" tags to the "RNF10[chr12:120554758 C>T]" variant  
    Given the drawer for the "CABP2[chr11:67522626 C>T]" variant was opened
    When the user clicks the "RNF10[chr12:120554758 C>T]" varinat in the left list 
    And clicks the "+Add" button in the "Tags" area
    And types the "Polyphen HDIV D" tag name in the textbox
    And clicks the "Add custom tag" button
    And scrolls the tags list down
    And checks the "Likely Benign" tag box
    And clicks the "Save tags" button
    Then the tag should attach to the variant
  
  Scenario: Add a note to the "RNF10[chr12:120554758 C>T]" variant  
    Given the drawer for the "RNF10[chr12:120554758 C>T]" variant was opened
    When the user clicks the "+Add" button in the "Notes" area
    And clicks the textbox to activate it
    And leaves a note: "MS, 11/10/21: a damaging prediction by Polyphen HDIV"
    And clicks the "Save note" button
    Then the note should attach to the variant  

  Scenario: (7) Add the "Likely Benign" tag to the "ACTG1, FSCN2 [chr17:81510330 C>T]" variant  
    Given the drawer for the "RNF10[chr12:120554758 C>T]" variant was opened
    When the user clicks the "ACTG1, FSCN2 [chr17:81510330 C>T]" varinat in the left list 
    And clicks the "+Add" button in the "Tags" area
    And scrolls the tag list down
    And checks the "Likely Benign" tag box
    And clicks the "Save tags" button
    Then the tag should attach to the variant    
   
  Scenario: (8) Create and add the "Benign" tag to the "JAG[chr20:10652589 G>A]" variant  
    Given the drawer for the "ACTG1, FSCN2 [chr17:81510330 C>T]" variant was opened
    When the user clicks the "JAG[chr20:10652589 G>A]" varinat in the left list 
    And clicks the "+Add" button in the "Tags" area
    And types the "Benign" tag name in the textbox
    And clicks the "Add custom tag" button
    And clicks the "Save tags" button
    Then the tag should attach to the variant

  Scenario: Add a note to the "JAG[chr20:10652589 G>A]" variant  
    Given the drawer for the "JAG[chr20:10652589 G>A]" variant was opened
    When the user clicks the "+Add" button in the "Notes" area
    And clicks the textbox to activate it
    And leaves a note: "MS, 11/10/21: it is possibly de-novo"
    And clicks the "Save note" button
    Then the note should attach to the variant 

  Scenario: Export the report about 2 variants for secondary review in the "Excel" and the "Csv" files
    Given the drawer for the "JAG[chr20:10652589 G>A]" variant was opened
    When the user clicks the cross button to close the drawer
    And clicks the "+Add" button in the "Tag(s)" zone at the top middle part of the page
    And checks the "For secondary review" tag box
    And clicks the "Apply" button
    And clicks the "Export report" dropdown menu at the top right corner
    And clicks the "Excel" option
    And clicks the "Export report" dropdown menu at the top right corner
    And clicks the "Csv" option
    Then 2 variants which have the "For secondary review" tag should be shown in the table 
    And the "Ecxel" file should be downloaded to the user PC 
    And the "Csv" file should be downloaded to the user PC 