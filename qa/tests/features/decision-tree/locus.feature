Feature: Decision Tree, Locus attributes
	As a user, I want filter variants list by Gene Region attribute

	Scenario: Open the "GeneRegion" dialog
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the "GeneRegion" functional attribute
		Then the "GeneRegion" attribute dialog should be open
		And the dialog should contain the "Locus" input and "All" and "Not" checkboxed

	Scenario Outline: Invalid Gene Region

#	Scenario Outline: Range of Gene Regions

	Scenario Outline: Cancel adding of a Gene Region
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And enters "chr15:" in the Locus input 
		And clicks the "Cancel" button
		Then the "Add attribute" dialog should be closed
		And the gene region should not be added to the step

#	Scenario Outline: Add a Gene Region without variants

	Scenario Outline: Add a Gene Region with variants
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And enters "chr15:" in the Locus input 
		And clicks the "Add attribute"
		Then the "chr15:" locus should be added to the tree
		And 170,745 variants should be included for the step 1
		And 5,458,008 variants should be displayed in the final step

#	Scenario Outline: Negate Gene Region
#		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
#		And the "chr15:" gene region was added to the first step
#		When the user check the "Negate" checkbox near the "GeneRegion" attribute in the first step
#		Then the GeneRegion attribute should be negated
#		And "NOT" should be added under the attribute name
#		And 5,458,008 variants should be included for the step 1
#		And 170,745 variants should be displayed in the final step


	Scenario: Add Step Before with additional Gene Region
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "chr15:" gene region was added to the first step
#		And the attrbiute was negated
		When the user clicks the first's step menu button
		And clicks the "Add Step Before" submenu
		And the step is added before
		And the user clicks the "Add attribute" button on the newly created step
		And clicks the "GeneRegion" attribute
		And enters the "chr14:" in the Locus input
		And clicks the "Add Attribute" button
		Then the "chr14:" locus should be added to the first step of the tree
		And 181,299 should be included in the first step
		And 5,447,454 variants should be in the second step
		And 170,745 variants should be included in the second step
		And 5,276,709 variants should be in the final step
 
	Scenario: Add Step After with additional Gene Region
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And two steps with Gene Region attributes were added to the tree
		When the user clicks the second step
		And clicks the step's menu
		And cliks the "Add Step After" submenu
		And the third step is added
		And the user clicks the "Add Attribute" button in the third step
		And the "Add Attribute" dialog is open
		And the user clicks the "GeneRegion" attribute
		And the "GeneRegion" attribute dialog is open
		And the user enters "chr16:" in the Locus input
		And clicks the "Add Attribute" button
		Then the "chr16:" locus should be added to the third step of the tree
		And 5,276,709 variants should comes to the third step from the second step
		And 171,180 variants should be included to the third step
		And 5,105,529 variants should be in the final step

	Scenario: "Join AND" additional Gene Region
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And three steps with Gene Region attributes were added to the tree
		When the user clicks the "Add Attribute" button on the third step
		And the "Add Attribute" dialog is open
		And the user clicks the "GeneRegion" attribute
		And the "GeneRegion" attribute's dialog is open
		And the user enters the "chr17:" in the Locus input
		And clicks the "Add by joining" button
		And clicks "Join by AND"
		Then the second GeneRegion attribute should be added to the third step
		And 0 variants should be included to the third step
		And 5,276,709 variants should be in the final step

	Scenario: "Join OR" additional Gene Region
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And three steps with Gene Region attributes were added to the tree
		And two attributes were added to the third step
		When the user clicks the "Add Attribute" button on the third step
		And the "Add Attribute" dialog is open
		And the user clicks the "GeneRegion" attribute
		And the "GeneRegion" attribute's dialog is open
		And the user enters "chr18:" in the Locus input
		And clicks the "Add by joining" button
		And clicks "Join by OR"
		Then the third GeneRegion attribute should be added to the third step
		And 163,295 variants should be included to the third step
		And 5,113,414 variants should be in the final step

	Scenario: Negate full step
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And three steps with Gene Region attributes were added to the tree
		And three attributes were added to the third step
		When the user clicks the third step's menu
		And clicks the "Negate" button
		Then all attributes should be negated
		And "Negate" checkboxes near the third step's attributes should be checked
		And 5,113,414 variants should be included to the third step
		And 163,295 variants should be in the final step

	Scenario Outline: Un-negate one Gene Region
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And three steps with Gene Region attributes were added to the tree
		And three attributes were added to the third step
		And the third step was negated
		When the user clicks the "Negate" checkbox near the second "GeneRegion" attribute in the third step ("chr17:)
		Then the "chr17" should be un-negated
		And 4,942,324 variants should be included in the third step
		And 334,475 variants should be in the final step

	Scenario Outline: Remove a step with Gene Region 
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And three steps with Gene Region attributes were added to the tree
		And three attributes were added to the third step
		And the third step was negated
		When the user clicks the menu of the second step
		And clicks the "Delete" button
		Then the second step should be removed
		# Is that correct? Need to review. @maria.savina
		And 5,447,454 variants should comes to the new second step from the first step
		And 5,112,979 variants should be included in the new second step
		And 334,475 variants should be in the final step

	Scenario Outline: Edit Gene Region
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And two steps with Gene Region attributes were added to the tree
		And three attributes were added to the second step
		And the second step was negated
		When the user clicks the "Edit Attribute" button near the attribute in the first step
		And the "Edit Attribute" dialog is open
		And the user changes "chr14:" to "chr13:"
		And clicks the "Save" button
		Then the attribute's value should be changed in the first step
		And 215,513 variants should be included in the first step
		And 5,413,240 variants should comes to the second step from the first step
		And 5,078,765 variants should be included in the second step
		# Final step variants number looks strange. @maria.savina
		And 334,475 variants should be in the final step


	Scenario Outline: Remove Gene Region from step
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And two steps with Gene Region attributes were added to the tree
		And three attributes were added to the second step
		And the second step was negated
		When the user clicks the "Edit Attribute" button near the "chr17:" attribute's value in the second step
		And the "Edit attribute" dialog is open
		And the user clicks the "Delete" button
		And clicks the "Save" button
		Then the attribute should removed
		# number of variants is unclear, bug on Backend. Impossible to remove attribute. 500 error returns.

#	tests will be finished when BE error will be fixed.

#	Scenario Outline: Exclude step with Gene Region

#	Scenario Outline: Include step with Gene Region

#	Scenario Ountline: Include final step

