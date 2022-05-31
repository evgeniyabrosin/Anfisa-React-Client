Feature: Decision Tree Panel, Create dataset
  As the Anfisa user I want to create new datasets on the "Decision Tree Panel" page
 
Scenario: Create dataset: empty name
	Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "⏚Hearing Loss, v.5" decision tree was loaded
	When the user clicks the "Create Derive DS" button
	And the "Add new dataset" dialog is displayed
	And doesn't enter a name for the dataset
	Then the "Add dataset" button should be disabled
		
Scenario: Create dataset: duplicated name
	Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "⏚Hearing Loss, v.5" decision tree was loaded
	When the user clicks the "Create Derive DS" button
	And the "Add new dataset" dialog is displayed
	And the user enters name for the dataset that already exists
	And clicks "Add dataset"
	Then The dataset should not be created with a duplicated name
	And the validation message should be displayed
		
Scenario: Create dataset: long name
	Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "⏚Hearing Loss, v.5" decision tree was loaded
	When the user clicks the "Create Derive DS" button
	And the "Add new dataset" dialog is displayed
	And enters name for a dataset with more than 250 characters.
	Then the "Add dataset" button should be disabled
	And the validation message should be displayed
		
Scenario: Create dataset: start with numeric
	Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "⏚Hearing Loss, v.5" decision tree was loaded
	When the user clicks the "Create Derive DS" button
	And the "Add new dataset" dialog is displayed
	And the user enters name for a dataset with name "1anfisa"
	Then the "Add dataset" button should be disabled
	And the validation message should be displayed
	
Scenario: Create dataset: start with special character
	Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "⏚Hearing Loss, v.5" decision tree was loaded
	When the user clicks the "Create Derive DS" button
	And the "Add new dataset" dialog is displayed
	And the user enters name for a dataset with name "!anfisa"
	Then the "Add dataset" button should be disabled
	And the validation message should be displayed
		
Scenario: Create dataset: name with spaces
	Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "⏚Hearing Loss, v.5" decision tree was loaded
	When the user clicks the "Create Derive DS" button
	And the "Add new dataset" dialog is displayed
	And the user enters name for a dataset with name "an fisa"
	Then the "Add dataset" button should be disabled
	And the validation message should be displayed

Scenario Outline: Create dataset: too many variants
	Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	When the user clicks "Add attribute" on the first step
	And clicks the "Add Attribute" button
	And clicks <Attribute Name>
	And clicks <Attribute Value>
	And clicks "Create Derive DS"
	And the "Add new dataset" dialog is displayed
	And the user enters <Dataset name> for the dataset
	And clicks the "Add dataset" button
	Then the "Add dataset" button should be disabled
	And the validation message should be displayed
		
Examples:
	| <Attribute Name> | <Attribute Value> | <Dataset name> |
	| Callers          | GATK_DE_NOVO      | anfisa         |

Scenario: Cancel dataset creation
	Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "⏚Hearing Loss, v.5" decision tree was loaded
	When the user clicks the "Create Derive DS" button
	And the "Add new dataset" dialog is displayed
	And enters name for the dataset
	And clicks the "Cancel" button
	Then dataset creation should be canceled
		
Scenario: Close Create Dataset dialog during creation
	Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "⏚Hearing Loss, v.5" decision tree was loaded
	When the user clicks the "Create Derive DS" button
	And enters name for the dataset
	And clicks "Add dataset"
	And the "Add new dataset" dialog is displayed
	And user clicks "X" button
	Then creation process should not be canceled