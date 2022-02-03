Feature: Use Case 1 S2
  As a Anfisa user I want to study the dataset derived from the "xl_PGP3140_wgs_NIST-4_2" dataset and created in TC_UC1S2 and download 2 unclear variants for secondary review.  
  
  Scenario: Open the Dataset info 
	Given the "Dataset list" was opened
	When the user clicks the "xl_PGP3140_wgs_NIST-4_2" XL dataset at the left part of the page
	Then the information of the XL-dataset (the "Dataset info" page) should be opened at the right part of the page