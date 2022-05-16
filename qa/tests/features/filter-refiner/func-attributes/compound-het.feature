Feature: Filter Refiner, Filter by Compound_Het
	As a user, I want to have an ability to filter variants by Compound Het

Scenario Outline: Secondary dataset
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
	When the user clicks the "Compound_Het" attribute
	And selects the <Compound Het Value> in the drop-down
	And clicks the "Add" button
	Then Compound_Het should be added to the right part of the page
	And variants list should be filtered by <Compound Het Value>
	And number of variants should be equal to <Variants Number>

Examples:
	| <Compound Het Value>         | <Variants Number> |
	| shared transcripts           | 0                 |
	| shared gene                  | 260               |
	| non-intersecting transcripts | 248               |

Scenario Outline: Secondary dataset - Go to Main Table
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
	When the user clicks the "Compound_Het" attribute
	And selects the <Compound Het Value> in the drop-down
	And clicks the "Add" button
	And the filter is applied
	And user clicks the "Apply" button
	Then the "Main Table" page should be open
	And number of variants equal to <Variants Number>

Examples:
	| <Compound Het Value>         | <Variants Number> |
	| shared transcripts           | 0                 |
	| shared gene                  | 260               |
	| non-intersecting transcripts | 248               |

Scenario Outline: Primary dataset
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
	When the user clicks the "Compound_Het" attribute
	And selects the <Compound Het Value> in the drop-down
	And clicks the "Add" button
	Then the "Add" button should be disabled
	And the filter should not be added
	And the <Validaion message> should be displayed

Examples:
	| <Compound Het Value>         | <Validaion message>       |
	| shared transcripts           | Too heavy condition       |
	| shared gene                  | Improper approx mode gene |
	| non-intersecting transcripts | Too heavy condition       |

Scenario Outline: Clear button
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl-4_2" was open
	When the user clicks the "Compound_Het" attribute
	And selects the <Compound Het Value> in the drop-down
	And clicks the "Add" button
	And the filter is applied
	And the user clicks the "Clear" button
	Then filter should be cleared

Examples:
	| <Compound Het Value>         |
	| shared transcripts           |
	| shared gene                  |
	| non-intersecting transcripts |