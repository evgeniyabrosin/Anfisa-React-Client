Feature: Decision Tree Panel, Decision Trees list
  As the Anfisa user I want to see the Decision Trees list on the "Decision Tree Panel" page
  
  	Scenario Outline: Decision Tree panel can be opened for a dataset
		Given Anfisa site was open
		When user clicks "<Dataset name>" dataset on the left panel
		And clicks on the "Decision Tree Panel" dropdown
		And the "Decision Tree Panel" should be open
		
		Examples:
		| <Dataset name>          |
		| PGP3140_wgs_pane l_hl   |
		| xl_PGP3140_wgs_NIST-4_2 |
		
  	Scenario Outline: Decision Tree can be loaded for the dataset
		Given "Decision Tree Panel" was open for an XL dataset
		When User clicks the "Select" dropdown in the "Decision trees" section
		And the list of Decision trees is displayed
		And User clicks the <Decision tree name> decision tree
		Then chosen decision tree should be loaded
		
		Examples: 
		| <Decision tree name>  |
		| ⏚Hearing Loss, v.5    | 
		| ⏚Damaging_Predictions |

	 Scenario Outline: Create new decision tree: valid case
		Given "Decision Tree Panel" was open for an XL dataset
		When user clicks "Add attribute" on the first step
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "Create New" near the "Decision Trees" section
		And enters <Decision tree name>
		And clicks the "Apply" button
		Then  New Decision tree should be created

		Examples:
		| <Attribute Name> | <Attribute Value> | <Decision tree name> |
		| Callers          | BGM_AUTO_DOM      | anfisa               |
		
	 Scenario Outline: Cancel creation new decision tree: valid case
		Given "Decision Tree Panel" was open for an XL dataset
		When user clicks "Add attribute" on the first step
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "Create New" near the "Decision Trees" section
		And enters <Decision tree name>
		And clicks the "Cancel" button
		Then  New Decision tree should not be created

		Examples:
		| <Attribute Name> | <Attribute Value> | <Decision tree name> |
		| Callers          | BGM_AUTO_DOM      | anfisa               |
		
	Scenario: Create new decision tree: duplicated name
		Given "Decision Tree Panel" was open for an XL dataset
		When user clicks "Add attribute" on the first step
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "Create New" near the "Decision Trees" section
		And enters name for the decision tree that already exists
		And clicks "Apply"
		Then  New Decision tree should not be created
	
	Scenario Outline: Create new decision tree: invalid case - name started from numeric
		Given "Decision Tree Panel" was open for an XL dataset
		When user clicks "Add attribute" on the first step
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "Create New" near the "Decision Trees" section
		And enters <Decision tree name>
		And clicks "Apply"
		Then  New Decision tree should not be created
		And error message about invalid name should be displayed

		Examples:
		| <Attribute Name> | <Attribute Value> | <Decision tree name> |
		| Callers          | BGM_AUTO_DOM      | 1anfisa              |
		
	Scenario Outline: Create new decision tree: invalid case - name with spaces
		Given "Decision Tree Panel" was open for an XL dataset
		When user clicks "Add attribute" on the first step
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "Create New" near the "Decision Trees" section
		And enters <Decision tree name>
		And clicks "Apply"
		Then  New Decision tree should not be created
		And error message about invalid name should be displayed

		Examples:
		| <Attribute Name> | <Attribute Value> | <Decision tree name> |
		| Callers          | BGM_AUTO_DOM      | an fisa              |
	
	Scenario Outline: Create new decision tree: invalid case - special chars
		Given "Decision Tree Panel" was open for an XL dataset
		When user clicks "Add attribute" on the first step
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "Create New" near the "Decision Trees" section
		And enters <Decision tree name>
		And clicks "Apply"
		Then  New Decision tree should not be created
		And error message about invalid name should be displayed

		Examples:
		| <Attribute Name> | <Attribute Value> | <Decision tree name> |
		| Callers          | BGM_AUTO_DOM      | !anfisa              |
		
	Scenario Outline: Create new decision tree: invalid case - too long name
		Given "Decision Tree Panel" was open for an XL dataset
		When user clicks "Add attribute" on the first step
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "Create New" near the "Decision Trees" section
		And enters <Decision tree name>
		And clicks "Apply"
		Then  New Decision tree should not be created
		And error message about invalid name should be displayed

		Examples:
		| <Attribute Name> | <Attribute Value> | <Decision tree name>                                                                                                                                                                                                      |
		| Callers          | BGM_AUTO_DOM      | anfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisa anfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisaanfisa |
	
	Scenario Outline: Create new decision tree: invalid case - empty name
		Given "Decision Tree Panel" was open for an XL dataset
		When user clicks "Add attribute" on the first step
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "Create New" near the "Decision Trees" section
		And enters nothing as name
		Then The "Apply" button should be hidden till the user doesn't enter a name

		Examples:
		| <Attribute Name> | <Attribute Value> |
		| Callers          | BGM_AUTO_DOM      |
	
	Scenario Outline: Modify the custom decision tree
		Given A custom decision tree was created and loaded
		When user adds a new step to the loaded decision tree
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value> 
		And clicks "Actions" near the decision tree name
		And the "Action" menu is opened
		And user clicks "Modify"
		And clicks the "Apply" button
		Then the Decision tree should be modified
		And the information message should appear in the right bottom corner of the screen

		Examples:
		| <Attribute Name> | <Attribute Value> |
		| Variant_Class    | insertion         |
		
	Scenario Outline: Cancel modifying the custom decision tree
		Given A custom decision tree was created and loaded
		When user adds a new step to the loaded decision tree
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value> 
		And clicks "Actions" near the decision tree name
		And the "Action" menu is opened
		And user clicks "Modify"
		And clicks the "Cancel" button
		Then the Decision tree should not be modified
		And "Cancel" and "Apply" button should be hidden
		And "Actions" menu should be displayed
		
		Examples:
		| <Attribute Name> | <Attribute Value> |
		| In_hg19          | Unmapped          |
		
	Scenario: Try to modify without changes
		Given A custom decision tree was created and loaded
		When User clicks clicks "Actions" near the decision tree name
		And the "Action" menu is opened
		And user clicks "Modify"
		Then the "There are no changes in Decision Tree" error message should be displayed

	Scenario Outline: Modify the predefined decision tree
		Given "Decision Tree Panel" was open for an XL dataset
		When User clicks the "Select" dropdown in the "Decision trees" section
		And the list of Decision trees is displayed
		And User clicks one of the decision trees ("<Decision tree name>")
		And chosen decision tree is loaded
		And user adds a new step to the loaded decision tree
		And clicks the "Add Attribute" button
		And clicks <Attribute Name>
		And clicks <Attribute Value> 
		And clicks "Actions" near the decision tree name
		And the "Action" menu is opened
		And user clicks "Modify"
		Then the error message should appear in the right bottom corner of the screen
		And the predefined decision tree should not be modified
		
		Examples:
		| <Attribute Name> | <Attribute Value> | <Decision tree name> |
		| In_hg19          | Unmapped          | ⏚Hearing Loss, v.4   |


	Scenario: Delete the custom decision tree
		Given A custom decision tree was created and loaded
		When user clicks "Actions" near the decision tree name
		And the "Action" menu is opened
		And user clicks "Delete"
		And clicks the "Apply" button
		Then the Decision tree should be deleted
		And the information message  should appear in the right bottom corner of the screen	
		
	Scenario: Cancel deletion the custom decision tree
		Given A custom decision tree was created and loaded
		When user clicks "Actions" near the decision tree name
		And the "Action" menu is opened
		And user clicks "Delete"
		And clicks the "Cancel" button
		Then the Decision tree should not be deleted

	Scenario Outline: Try to delete the predefined decision tree
		Given "Decision Tree Panel" was open for an XL dataset
		When User clicks the "Select" dropdown in the "Decision trees" section
		And the list of Decision trees is displayed
		And User clicks one of the decision trees ("<Decision tree name>")
		And chosen decision tree is loaded
		When user clicks "Actions" near the decision tree name
		And the "Action" menu is opened
		And user clicks "Delete"
		Then the error message should appear in the right bottom corner of the screen
		And the predefined decision tree should not be deleted

		Examples:
		| <Decision tree name>  |
		| ⏚Hearing Loss, v.5    |
		| ⏚Damaging_Predictions |