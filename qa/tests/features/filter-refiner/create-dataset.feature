Feature: Filter Refiner, Create dataset
  As the Anfisa user I want to create new datasets on the "Filter Refiner" page
 
	Scenario: Create dataset: empty name
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "⏚Loss_Of_Function" preset was loaded
		When the user clicks the "Save dataset" button
		And the "Add new dataset" dialog is displayed
		And the user doesn't enter a name for the dataset
		Then the "Add dataset" button should be disabled
		
	Scenario: Create dataset: duplicated name
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "⏚Loss_Of_Function" preset was loaded
		When the user clicks the "Save dataset" button
		And the "Add new dataset" dialog is displayed
		And the user enters name for the dataset that already exists
		And clicks "Add dataset"
		Then The dataset should not be created with a duplicated name
		And the validation message should be displayed
		
	Scenario: Create dataset: long name
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "⏚Loss_Of_Function" preset was loaded
		When the user clicks the "Save dataset" button
		And the "Add new dataset" dialog is displayed
		And the user enters name for a dataset with more than 255 characters.
		Then the "Add dataset" button should be disabled
		And the validation message should be displayed
		
	Scenario: Create dataset: start with numeric
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "⏚Loss_Of_Function" preset was loaded
		When the user clicks the "Save dataset" button
		And the "Add new dataset" dialog is displayed
		And the user enters name for a dataset with name "1anfisa"
		Then the "Add dataset" button should be disabled
		And the validation message should be displayed
	
	Scenario: Create dataset: start with special character
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "⏚Loss_Of_Function" preset was loaded
		When the user clicks the "Save dataset" button
		And the "Add new dataset" dialog is displayed
		And enters name for a dataset with name "!anfisa"
		Then the "Add dataset" button should be disabled
		And the validation message should be displayed
		
	Scenario: Create dataset: name with spaces
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "⏚Loss_Of_Function" preset was loaded
		When the user clicks the "Save dataset" button
		And the "Add new dataset" dialog is displayed
		And enters name for a dataset with name "an fisa"
		Then the "Add dataset" button should be disabled
		And the validation message should be displayed

	Scenario Outline: Create dataset: too many variants
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the <Attribute Name>
		And clicks the <Attribute Value>
		And clicks the "Add" button to apply the filter
		And clicks "Save dataset"
		And the "Add new dataset" dialog is displayed
		And enters <Dataset name> for the dataset
		And clicks the "Add dataset" button
		Then the "Add dataset" button should be disabled
		And the validation message should be displayed
		
		Examples:
		| <Attribute Name> | <Attribute Value>            | <Dataset name> |
		| Callers          | INHERITED_FROM: Both parents | anfisa         |

	Scenario: Cancel dataset creation
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "⏚Hearing Loss, v.5" decision tree was loaded
		When the user clicks the "Save dataset" button
		And the "Add new dataset" dialog is displayed
		And enters name for the dataset
		And clicks the "Cancel" button
		Then dataset creation should be canceled
		
	Scenario: Close Create Dataset dialog before creation
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "⏚Loss_Of_Function" preset was loaded
		When the user clicks the "Save dataset" button
		And enters name for the dataset
		And user clicks "X" button
		Then creation process should  be canceled
		
	Scenario: Close Create Dataset dialog during creation
		Given "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "⏚Loss_Of_Function" preset was loaded
		When the user clicks the "Save dataset" button
		And enters name for the dataset
		And clicks "Add dataset"
		And user clicks "X" button
		Then creation process should not be canceled