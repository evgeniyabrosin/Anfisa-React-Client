Feature: Decision Tree Panel, Decision Trees list
  As the Anfisa user I want to see the Decision Trees list on the "Decision Tree Panel" page
  
Scenario Outline: 01 Decision Tree panel can be opened for a dataset
	Given Anfisa site was open
	When user clicks "<Dataset name>" dataset on the left panel
	And clicks "Open in viewer" button
	And clicks on the "Decision Tree Panel" 
	Then the "Decision Tree Panel" should be open
		
Examples:
	| <Dataset name>          |
	| PGP3140_wgs_pane l_hl   |
	| xl_PGP3140_wgs_NIST-4_2 |
		
 Scenario Outline: 02 Create new dataset 
   Given Decision Tree Panel was opened
   When user clicks "Add attribute" on the first step
   And clicks on <filter>
   And clicks on <attribute>
   And clicks "Select Decision Tree" drop down menu
   And Clicks "Create New Decision Tree"
   And writes <Decision tree name> 
   And clicks "Create"
   Then New Decision tree should be created.

Examples: 
    | <filter> | <attribute>  | <Decision tree name> |
    | Callers  | BGM_AUTO_DOM | anfisa               |

 Scenario Outline: 03 Add new step before to the Decision tree
	Given Anfisa main page is loaded
	When User clicks "Select Decision Tree"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name>  
	And clicks "Apply Filter"
	And Chosen decision tree is loaded
	And user clicks setting button near the first step (three dots)
	And Setting panel is opened
	And user clicks "Add step Before" 
	Then New step should be added before the first step to the decision tree.

Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |



	 Scenario Outline: 04 Add new step after to the Decision tree
	Given Anfisa main page is loaded
	When User clicks "Select Decision Tree"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name>  
	And clicks "Apply Filter"
	And Chosen decision tree is loaded
	And user clicks setting button near the first step (three dots)
	And Setting panel is opened
	And user clicks  "Add step after"
	Then New step should be added after the first step to the decision tree.

Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |


Scenario Outline: 05 Decision Tree can be loaded for the dataset
	Given "Decision Tree Panel" was open for an XL dataset
	When User clicks "Select Decision Tree"
	And the list of Decision trees is displayed
	And User clicks the <Decision tree name> decision tree
	And Clicks "Apply Filter"
	Then chosen decision tree should be loaded
		
Examples:
	| <Decision tree name>  |
	| ⏚Hearing Loss, v.5    |
	| ⏚Damaging_Predictions |


Scenario Outline: 06 Negate step
	
	Given Anfisa main page was loaded
	When User clicks "Select Decision Tree"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name>  
	And Clicks "Apply Filter"
	And chosen decision tree is loaded
	And user clicks setting button near the first step (three dots)
	And Setting panel is opened
	And user clicks "Negate"
	Then the step should be Negated

Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |

Scenario Outline: 07 Modify Decision tree without changes
	Given Anfisa main page was loaded
	When User clicks "Select Decision Tree"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name> 
	And Clicks "Apply Filter"
	And chosen decision tree is loaded
	And  Clicks "Select Decision Tree"
	And User clicks three dots near the custom decision tree
	Then "Modify" button should be unable to click when there is no any changes done.


Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |


Scenario Outline: 08 Modify Decision tree with changes
	Given Anfisa main page was loaded
	When User clicks "Select Decision Tree"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name> 
	And Clicks "Apply Filter"
	And chosen decision tree is loaded
    And Makes some changes to the custom decision tree
	And Clicks "Select Decision Tree"
	And User clicks three dots near the custom decision tree
	And user clicks "Modify"
	Then decision three should be Modified 


Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |



Scenario: 09 Delete custom decision Tree
	Given Anfisa main page was loaded
	When User clicks "Select Decision Tree"
	And the panel of Decision trees is opened
	And User clicks one of the custom decision trees
	And Clicks "Apply Filter"
	And chosen custom decision tree is loaded
	And Clicks "Select Decision Tree"
	And User clicks three dots near the custom decision tree
	And user clicks "Delete"
	Then created decision tree should be deleted.


Scenario Outline: 10 Delete default decision Tree
	Given Anfisa main page was loaded
	When User clicks "Select Decision Tree"
	And the panel of Decision trees is opened
	And User clicks one of the <default decision tree>.
	And Clicks "Apply Filter"
	And chosen  decision tree is loaded
	And Clicks "Select Decision Tree"
	And User clicks three dots near the custom decision tree
	And user clicks "Delete"
	Then Default decision tree should be not deleted.


Examples:
	| <default decision tree> |
	| ⏚BGM Red Button         |
	| ⏚BGM Research           |
	