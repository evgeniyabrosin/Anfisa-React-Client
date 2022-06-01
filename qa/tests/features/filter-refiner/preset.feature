Feature: Filter Refiner, Presets
	As a user, I want to apply predefined presets to filter variants

	Scenario Outline: 01 load a preset for XL dataset
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "Select Filter Preset" dropdown
		And selects the preset <Preset Name>
		And clicks the "Apply Filter" button
		Then the selected preset should be loaded

		Examples:
		| <Preset Name>      |
		| Loss_Of_Function   |
		| In_Silico_Damaging |
		| Impact_Splicing    |

	Scenario Outline: 02 load a preset for Secondary dataset
		Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" was open
		When user clicks the "Select Filter Preset" dropdown
		And selects the preset <Preset Name>
		And clicks the "Apply Filter" button
		Then the selected preset should be loaded

		Examples:
		| <Preset Name>            |
		| BGM_De_Novo              |
		| SEQaBOO_Hearing_Loss_v_5 |
		| SEQaBOO_ACMG59           |

	Scenario Outline: 03 Create a preset
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "Num_Samples" attribute
		And enters "1" as Minimum value
		And changes "<" sign with "≤"
		And enters "2" as Maximum value
		And changes "≤" sign with "<"
		And clicks the "+ Add Attribute" button
		And the filter is applied and the range "1<=Num_Samples<2" is displayed in the right part of the screen
		And user clicks the "Variant_Class" attribute
		And clicks "deletion" and "insertion" values
		And clicks the "+ Add Attribute" button
		And the filter is applied
		And user clicks the "+" button near the "Functional Units"
		And clicks "Inheritance_Mode" 
		And clicks the "HG002" problem group
		And clicks the "Homozygous Recessive" value
		And clicks the "Apply" button 
		And the filter is applied
		And user clicks the "gnomAD_PopMax" attribute
		And clicks the "AMR" value
		And clicks the "+ Add Attribute" button
		And the number of variants equal to 855
		And user clicks "Select Filter Preset" dropdown
		And clicks the "Create New Filter Preset" button
		And enters the <Preset Name>
		And clicks the "Create" button
		Then the preset is created 
		And information message appears
		And the preset is present in the presets list

		Examples:
		| <PresetName>                |
		| preset                      |
		| preset_preset               |
		| preset_preset_preset_preset |

	Scenario: 04 Create a preset without attributes
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user doesn't add attribute
		And clicks "Select Filter Preset" dropdown
		Then the "Create New Filter Preset" button should be disabled

	Scenario: 05 Modify a custom preset
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "Select Filter Preset" dropdown
		And clicks the custom preset
		And clicks the "Apply Filter" button
		And the preset is loaded
		And user deletes any attribute in the right part of the screen
		And user clicks three dots near the custom preset
		And clicks the "Modify" option
		Then the preset should be modified

	Scenario: 06 Join two presets
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "Select Filter Preset" dropdown
		And selects the "Loss_Of_Functions" preset
		And clicks the "Apply Filter" button
		And the "Loss_Of_Functions" preset is loaded
		And user clicks the "Select Filter Preset" dropdown
		And selects the "In_Silico_Damaging" preset
		And clicks the "Join" option
		Then filters from "Loss_Of_Functions" and "In_Silico_Damaging" presets should be merged
		And the number of variants should be 1

	Scenario: 07 Delete a custom preset
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "Select Filter Preset" dropdown
		And clicks three dots near the custom preset 
		And clicks the "Delete" option
		And the "Delete Filter Preset" window is opened
		And user clicks the "Yes, Delete Filter Preset" button
		Then the preset should be deleted
