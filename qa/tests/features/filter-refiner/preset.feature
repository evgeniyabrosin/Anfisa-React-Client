Feature: Filter Refiner, Presets
	As a user, I want to apply predefined presets to filter variants

	Scenario Outline: load a preset for XL dataset
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Preset" dropdown
		And selects the preset <Preset Name>
		And clicks "Actions" button
		And the "Actions" menu is opened
		And the user clicks the "Load"
		And clicks the "Apply" button
		Then the selected preset should be loaded

		Examples:
		| <Preset Name>      |
		| Loss_Of_Function   |
		| In_Silico_Damaging |
		| Impact_Splicing    |

	Scenario Outline: load a preset for Secondary dataset
		Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
		When the user clicks the "Preset" dropdown
		And selects the preset <Preset Name>
		And clicks "Actions" button
		And the "Actions" menu is opened
		And the user clicks the "Load"
		And clicks the "Apply" button
		Then the selected preset should be loaded

		Examples:
		| <Preset Name>            |
		| BGM_De_Novo              |
		| SEQaBOO_Hearing_Loss_v_5 |
		| SEQaBOO_ACMG59           |

	Scenario Outline: Create a preset
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Num_Samples" attribute
		And enters "1" as Minimum value
		And enters "2" as Maximum value
		And clicks the "Add" button to apply the filter
		And the filter is applied and the range "1<Num_Samples<2" is displayed in the right part of the screen
		And the user clicks the "Variant_Class" attribute
		And clicks "deletion" and "insertion" values
		And clicks the "Add" button to apply the filter
		And the filter is applied
		And the user clicks the "Inheritance_Mode" attribute
		And clicks the "HG002" problem group
		And clicks the "Homozygous Recessive" value
		And clicks the "Add" button to apply the filter
		And the filter is applied
		And the user clicks the "gnomAD_PopMax" attribute
		And clicks the "AMR" value
		And clicks the "Add" button to apply the filter
		And the number of variants equal to 855
		And the user clicks the "+ Create New" button near presets dropdown
		And enters the <Preset Name>
		And clicks the "Apply" button
		Then the preset is created 
		And information message appears
		And the preset is present in the presets list

		Examples:
		| <PresetName>                |
		| Preset 10                   |
		| preset                      |
		| preset_preset               |
		| preset_preset_preset_preset |

	Scenario Outline: Create a preset without attributes
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "+ Create New" button near presets dropdown
		And enters the <Preset Name>
		And clicks the "Apply" button
		Then the preset should not be created
		And warning message about no data should be displayed

		Examples:
		| <PresetName> |
		| Preset 10                   |
		| preset                      |
		| preset_preset               |
		| preset_preset_preset_preset |

	Scenario: Modify a custom preset
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Preset" dropdown
		And selects a custom preset
		And clicks the "Actions" menu
		And clicks the "Load" option
		And clicks the "Apply" button
		And the preset is loaded
		And the user unchecks any attribute in the right part of the screen
		And the filter by this attribute is cleared
		And the user selects the same preset in the "Presets" list
		And clicks the "Modify" option
		And clicks the "Apply" button
		Then the preset should be modified

	Scenario: Modify a predefined preset
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Preset" dropdown
		And selects the "Loss_Of_Function" preset
		And clicks the "Actions" menu
		And clicks the "Load" option
		And clicks the "Apply" button
		And the preset is loaded
		And the user unchecks any attribute in the right part of the screen
		And the filter by this attribute is cleared
		And the user selects the same preset in the "Presets" list
		And clicks the "Modify" option
		And clicks the "Apply" button
		Then the "Apply" button should be disabled
		And the preset should not be modified

	Scenario: Join two presets
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Preset" dropdown
		And selects the "Loss_Of_Functions" preset
		And clicks the "Action" menu
		And clicks the "Load" option
		And clicks the "Apply" button
		And the "Loss_Of_Functions" preset is loaded
		And the user clicks the "Actions" menu
		And clicks the "Join" option
		And selects the "In_Silico_Damaging" preset
		And clisks the "Apply" button
		Then the information message about successful joining should be displayed
		And filters from "Loss_Of_Functions" and "In_Silico_Damaging" presets should be merged
		And the number of variants should be 1774

	Scenario: Delete a custom preset
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Preset" dropdown
		And selects a custom preset
		And clicks the "Actions" menu
		And clicks the "Load" option
		And clicks the "Apply" button
		And the preset is loaded
		And the user clicks the "Actions" menu
		And clicks the "Delete" option
		And clicks the "Apply" button
		Then the preset should be deleted

	Scenario: Delete a predefined preset
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Preset" dropdown
		And selects the "Loss_Of_Function" preset
		And clicks the "Actions" menu
		And clicks the "Load" option
		And clicks the "Apply" button
		And the preset is loaded
		And the user clicks the "Actions" menu
		And clicks the "Delete" option
		And clicks the "Apply" button
		Then the "Apply" button should be disabled
		And the preset should not be deleted
