Feature: Decision Tree Panel, Decision Trees list
  As the Anfisa user I want to see the Decision Trees list on the "Decision Tree Panel" page
  
Scenario Outline: Decision Tree panel can be opened for a dataset
	Given Anfisa site was open
	When user clicks "<Dataset name>" dataset on the left panel
	And clicks "Open in viewer" button
	And clicks on the "Decision Tree Panel" 
	Then the "Decision Tree Panel" should be open
		
Examples:
	| <Dataset name>          |
	| PGP3140_wgs_pane l_hl   |
	| xl_PGP3140_wgs_NIST-4_2 |
		
 Scenario Outline: Create new dataset 
   Given Decision Tree Panel was opened
   When user clicks "Add attribute" on the first step
   And clicks on <filter>
   And clicks on <attribute>
   And clicks "Create New" near the "Decision Trees"
   And writes <Decision tree name> 
   And clicks "Apply"
   Then New Decision tree should be created.

Examples: 
    | <filter> | <attribute>  | <Decision tree name> |
    | Callers  | BGM_AUTO_DOM | anfisa               |

 

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

Scenario Outline: Add new step to the Decision tree
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name>  
	And chosen decision tree is loaded
	And user clicks setting button near the first step (three dots)
	And Setting panel is opened
	And user clicks "Add step Before" or "Add step after"
	Then New step should be added before and after to the decision tree.

Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |

Scenario Outline: Negate step
	
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name>  
	And chosen decision tree is loaded
	And user clicks setting button near the first step (three dots)
	And Setting panel is opened
	And user clicks "Negate"
	Then the step should be Negated

Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |

Scenario Outline: Modify Decision tree
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the <Decision tree name>  
	And chosen decision tree is loaded
	And clicks "Actions" near decision tree panel
	And action panel is opened
	And user clicks "Modify"
	Then decision three should not be Modified (when there are no changes in the tree)


Examples:
	| <Decision tree name> |
	| ⏚BGM Red Button      |
	| ⏚BGM Research        |

Scenario Outline: Delete custom decision Tree
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the custom decision trees
	And chosen custom decision tree is loaded
	And user clicks "Actions" near "Decision trees"
	And Action panel is opened
	And user clicks "Delete"
	Then created decision tree should be deleted.


Scenario Outline: Delete default decision Tree
	Given Anfisa main page is loaded
	When User clicks "select" down the "Decision trees"
	And the panel of Decision trees is opened
	And User clicks one of the <default decision tree>
	And chosen  decision tree is loaded
	And user clicks "Actions" near "Decision trees"
	And Action panel is opened
	And user clicks "Delete"
	Then created decision tree should be not deleted.


Examples:
	| <default decision tree> |
	| ⏚BGM Red Button         |
	| ⏚BGM Research           |
	