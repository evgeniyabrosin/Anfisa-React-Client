Feature: Decision Tree Panel, Text Editor
  As the Anfisa user I want to edit a decision tree via Text Editor dialog
  
	Background: Decision Tree panel for an XL dataset

	Scenario: Text editor can be opened when there are no data in the decision tree
		Given "Decision Tree Panel" was open for an XL dataset
		When the user clicks the "Text editor" button
		Then the "Text editor" dialog should be open
		And "return False" row is present in the dialog

	
	Scenario: Dark mode can be turned on
		Given the "Text editor" was open
		When the user switches the dialog view to the "Dark mode"
		Then the "Dark mode" should be turned on in the dialog

	Scenario: Dark mode saves after the dialog is closed
		Given the "Text editor" was open
		And the "Dark mode" was turned on
		When the user closes the "Text Editor" dialog
		And opens it again
		Then the "Dark mode" should be stay turned on

	Scenario: Light mode can be turned on
		Given the "Text editor" was open
		And the "Dark mode" is turned on
		When the user switches the dialog view to the "Light mode"
		Then the "Dark mode" should be turned off in the dialog
		And the "Light mode" should be turned on

	Scenario: Light mode saves after the dialog is closed
		Given the "Text editor" was open
		And the "Light mode" is turned on
		When the user closes the "Text Editor" dialog
		And opens it again
		Then the "Light mode" should be stay turned on

	Scenario: Close via Cross button
		Given the "Text editor" was open
		When the user adds an additional valid value in the attribute condition manually
		And closes the dialog via Close (cross) button
		Then the dialog should be closed
		And changes should not be saved
	
	Scenario Outline: Add attribute to the first step via Decision Tree
		Given "Decision Tree Panel" was open for an XL dataset
		When the user clicks the "Add attribute" button on the first step
		And the "Add attribute" dialog is open
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks the "Add Attribute" button
		And the user clicks the "Text editor" button
		Then the "Text editor" dialog should be open
		And three rows with text "if <Attribute Name> in {<Attribute Value>}: return True return False" are present in the dialog

		Examples:
		| <Attribute Name> | <Attribute Value> | 
		| Callers          | BGM_AUTO_DOM      | 

	Scenario Outline: Save changes locally via Done button
		Given the "Text editor" was open
		And the <Attribute Name> is added to the first step with the <Attribute Value>
		When user clicks the "Text editor" button
		And adds the <New Value> in the attribute condition manually
		And clicks the "Done" button
		Then the dialog should be closed
		And changes should be saved locally
		And attributes list in the Algorithm section should not be updated

		Examples:
		| <Attribute Name> | <Attribute Value> | <New Value>     |
		| Callers          | BGM_AUTO_DOM      | GATK_HOMOZYGOUS |
	
	Scenario Outline: 
		Given "Decision Tree Panel" was open for an XL dataset
		And the <Attribute Name #1> with <Attribute Value #1> was added to the first step
		And changes in the attribute are saved locally
		When the user clicks "Add attribute" button on the first step
		And the "Add attribute" dialog is open
		And user clicks the <Attribute Name #2>
		And selects the <Attribute Value #2>
		And clicks the "Add by joining" button
		And clicks "Join by AND"
		And the second attribute is added to the first step
		And the user clicks the "Text editor" button
		And look at the source code in the dialog
		Then the second attribute should be added, the first attribute contains changes entered manually

		
		Examples:
		| <Attribute Name #1> | <Attribute Value #1> | <Attribute Name #2> | <Attribute Value #2> |
		| Callers             | BGM_AUTO_DOM         | Variant_Class       | deletion             |

		
	Scenario Outline: "Drop changes" button
		Given the "Text editor" was open
		And two attributes were added to the first step
		When the user adds <New Value> to the condition with the second attribute <Attribute Name #2>
		And clicks the "Drop changes" button
		Then the <New Value>  should be cleared
		And previous changes should stay in the dialog

		Examples:
		| <Attribute Name #2> | <New Value>     |
		| Variant_Class       | GATK_HOMOZYGOUS |

		
	Scenario: Add the second step via DTree when the first step was removed and this changes were saved locally
		Given the "Text editor" was open
		And two attributes were added to the first step
		When the user removes the first step manually
		And only "return False" line is present in the dialog
		And the user clicks the "Done" button
		And the dialog is closed
		And the attributes list in the Algorithm section is not updated
		And the user clicks the "+ Add step" button
		And the second step is added
		And the user clicks the "Add attribute" button on the second step
		And the "Add attribute" dialog is open
		And the user clicks the <Attribute Name>
		And selects the <Attribute Value>
		And clicks the "Add Attribute" button
		And the <Attribute Name> is added to the second step
		And the user clicks the "Text editor" button
		And looks at the source code in the dialog
		Then the second step with the attribute should be present
		And the first step with attributes should not be preset

		Examples:
		| <Attribute Name> | <Attribute Value> |
		| Symbol           | AADAC             |


	Scenario: Save changes
		Given the "Text editor" was open
		And the first step was removed manually 
		And removing was saved locally
		And the second step was added via Decision Tree
		When the user clicks the "Save" button
		Then the dialog should be closed
		And the changes should be saved on the server
		And the steps list in the Algorithm section should be updated
		And the first step should be removed

	Scenario: Try to save with invalid boolean value
		Given "Decision Tree Panel" was open for an XL dataset
		And the first step with attribute was added to the decision tree
		When the user clicks the "Text editor" button
		And changes a boolean value  (True/False) at the end of the condition to an invalid one (e.g., qwerty)
		And clicks "Save" or "Done" buttons
		Then the error message should be displayed
		And "Save" and "Done" buttons should be disabled

	Scenario: Try to save with invalid word instead of "return"
		Given the "Text editor" was open
		And data were valid
		When the user changes the "return" word to an invalid one (e.g., qwerty)
		And clicks "Save" or "Done" buttons
		Then the error message should be displayed
		And "Save" and "Done" buttons should be disabled

	Scenario: Back from invalid data to valid
		Given the "Text editor" was open
		And invalid value was entered instead of the "return" word
		When the user changes an invalid value to the "return" word
		Then the error should be hidden
		And "Save" and "Done" buttons should be active

	Scenario: Clear all data manually: invalid case
		Given the "Decision Tree panel" was open for the XL dataset
		When the user clicks the "Text editor" button
		And clears all data in the dialog manually
		And clicks "Save" or "Done" buttons
		Then the warning message should be displayed
		And "Save" and "Done" buttons should be disabled

	Scenario: Add unexisted value to the attribute
		Given the "Text editor" was open
		And all data were cleared
		When the user presses Ctrl+Z
		And a step with an attribute is returned to the source code
		And the user adds an invalid value to the attribute condition (e.g., "qwerty")
		And click the "Save" button
		Then changes should be saved
		And entered value should be displayed in the source code in the Algorithm section.

	Scenario: Clear all data manually: valid case
		Given the "Decision Tree panel" was open for the XL dataset
		When the user clicks the "Text editor" button
		And removes all data except the "return False" row 
		And  clicks the "Save" button
		Then changes should be saved
		And steps list should be empty in the Algorithm section

	Scenario Outline: Copy 100 rows
		Given "Decision Tree Panel" was open for an XL dataset
		When the user clicks the "Add attribute" button on the first step
		And the "Add attribute" dialog is open
		And clicks the <Attribute Name>
		And enters the <Attribute Value>
		And clicks the "Add attribute" button
		And the <Attribute Name> is added to the first step
		And the user clicks the "Text editor" button
		And copies the <Attribute Name> condition
		And pastes it a few times after the first condition and before "return False" at the ending
		And repeats pasting a few times to add more than 100 rows
		And clicks the "Save" button
		Then changes should be saved
		And new steps are should present in the Algorithm section

		Examples:
		| <Attribute Name> | <Attribute Value>    |
		| Num_Samples      | 1 < Num_Samples <= 2 |

	Scenario: Enter a decision tree manually
		Given "Decision Tree Panel" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the decision tree is empty
		When the user clicks the "Text editor" button
		And the "Text Editor" dialog is opened
		And the user enters the following source code
		 """
			if Min_GQ < 20:
				return False
			if FS > 30:
				return False
			if (0 < QD and QD < 4):
				return False
			if (QD < 0 and 0 < QUAL and QUAL < 40):
				return False
			if Num_Samples < 1:
				return False
			if Panels not in {All_Hearing_Loss}:
				return False
			if HGMD_Tags in {"DM"}:
				return True
			if gnomAD_AF >= 0.05:
				return False
			if (Region_Worst not in {"exon"}) and Dist_from_Exon_Worst > 5:
				return False
			if Region_Worst in {"masked_repeats"}:
					return False
			if (Clinvar_Benign in {"VUS or Pathogenic"} and
					(Clinvar_Trusted_Simplified in {"uncertain", "pathogenic"} or
						Clinvar_Trusted_Simplified not in {"benign"})):
				return True
			if (Callers in {"BGM_BAYES_DE_NOVO"}):
				return True
			if (Callers in {"RUFUS"}):
				return True
			if (Callers in {"CNV"}):
				return True
			if (Most_Severe_Consequence in {
						'transcript_ablation',
						'splice_acceptor_variant',
						'splice_donor_variant',
						'stop_gained',
						'frameshift_variant',
						'stop_lost',
						'start_lost'
					}):
				return True
			if (Most_Severe_Consequence not in {
					"inframe_insertion",
					"inframe_deletion",
					"missense_variant",
					"protein_altering_variant",
					"splice_region_variant",
					"synonymous_variant",
					"stop_retained_variant",
					"coding_sequence_variant"
					}):
				return False
			if (gnomAD_AF <= .0007 and
					(gnomAD_PopMax_AN <= 2000 or gnomAD_PopMax_AF <= .01)):
				return True
			return False
		 """
		 And 
		 And clicks the "Save" button
		 And opens the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset in a new browser tab
		 And loads the "Hearing Loss, v.5" decision tree
		 And compares the decision tree on the first browser tab (entered via the "Text Editor") and on the second tab (loaded via Decision Tree list)
		 Then Decision Trees should be the same
		 And number Total variants, Accepted variants, and Rejected variants should be the same