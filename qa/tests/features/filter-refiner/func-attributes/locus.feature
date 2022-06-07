Feature: Filter Refiner, Filter by Locus (GeneRegion)
	As a user, I want to have an ability to filter variants by Gene Region value

Scenario Outline:01 Add a valid locus - Secondary dataset
	Given the Filter Refiner for the <Dataset Name> was open
	When the user clicks Edit Filters
	And clicks "+" button near Functional Units
	And clicks the "GeneRegion" functional attribute
	And enters <Valid Locus> value in the input field
	And clicks the "Add" button
	Then the filter by Locus should be added
	And variants list should be filtered
	And variants number should be equal to <Total Variants>

Examples:
	| Dataset Name         | <Valid Locus> | <Total Variants> |
	| PGP3140_wgs_panel_hl | chr1:6500660  | 1                |
	| PGP3140_wgs_panel_hl | chr1:27481530 | 1                |
	| PGP3140_wgs_panel_hl | chr1:65058247 | 0                |
#		| xl_PGP3140_wgs_NIST-4_2 | chr3:25192-chr3:25605 | 3                |

Scenario Outline:02 Add a valid locus - Primary dataset
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
	When the user clicks Edit Filters
	And clicks the "GeneRegion" functional attribute
	And enters <ValidN Locus> value in the input field
	And clicks the "Add" button
	Then the filter by Locus should be added
	And variants list should be filtered
	And variants number should be equal to <Total Variants>
	And <Total variants> should be displayed in the "View Variants" dialog

Examples:
	| <Valid Locus> | <Total Variants> |
	| chr18:25165   | 1                |
	| chr19:251070  | 1                |

Scenario Outline:03 Add an Invalid locus
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
	When the user clicks "+" button near Functional Units
	And  clicks the "GeneRegion" functional attribute
	And enters <Invalid Locus> value in the input field
	And clicks the "Add" button
	Then the "Add" button should be disabled
	And the filter should not be added
	And the validation message should be displayed

Examples:
	| <Invalid Locus> |
	| chr1:6500he660  |
	| chr1:64@84880   |
	| chr32:6505824   |
	| 1               |
	| qwerty          |

Scenario Outline:04 Add an Empty locus
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
	When the user clicks Edit Filters
	And clicks "+" button near Functional Units
	And clicks the "GeneRegion" functional attribute
	And nothing enters to the "Locus" field
	And clicks the "Add" button
	Then the "Add" button should be disabled
	And the filter should not be added
	And the validation message should be displayed

Scenario Outline:05 Clear button
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
	When the user  clicks "+" button near Functional Units
	And  clicks the "GeneRegion" functional attribute
	And inputs "<Valid Locus>"
	And clicks the "Add"
	And the filter is applied
	And the user clicks the "Clear" button
	Then the filter by Locus should be cleared
	And Variants number should be updated

Examples:
	| <Valid Locus> |
	| chr1:6500660  |
	| chr1:6484880  |
	| chr1:6505824  |