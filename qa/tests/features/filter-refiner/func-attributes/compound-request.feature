Feature: Filter Refiner, Filter by Compound_Request
	As a user, I want to have an ability to filter variants by Compound Request

	Background: Filter Refiner, Compound_Request filter

	Scenario: XL dataset - "Approx" is disabled for XL dataset
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		Then the "Approx" dropdown should be disabled
		And should be equal to "non-intersecting transcripts"

	Scenario: XL dataset - 1 empty row
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And doesn't fill any data
		And clicks the "Add" button
		Then the "Add" button should be disabled
		And the filter should not be applied

	Scenario: XL dataset - 1 row, MIN count = 0
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And selects the "Compensational" reset
		And enters "0" in the "Minimal count of events" input
		And clicks the "Add" button
		Then the "Add" button should be disabled
		And the validation message that "Minimal count of events" should be more than 0 should be displayed
		And the filter should not be applied

	Scenario: XL dataset - 1 row, MIN count = 1
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And selects the "Compensational" reset
		And enters "1" in the "Minimal count of events" input
		And clicks the "Add" button
		Then "Compound_Request" should be added to the right part of the page
		And variants list should be filtered by Compensational reset 
		And number of variants should be equal to 108891

	Scenario: XL dataset - 1 row, MIN count = 10
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And selects the "Compensational" reset
		And enters "500" in the "Minimal count of events" input
		And clicks the "Add" button
		Then "Compound_Request" should be added to the right part of the page
		And variants list should be filtered by Compensational reset 
		And number of variants should be equal to 1070

	Scenario: XL dataset - 1 row, MIN count = 1000
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And selects the "Compensational" reset
		And enters "1000" in the "Minimal count of events" input
		And clicks the "Add" button
		Then "Compound_Request" should be added to the right part of the page
		And variants list should be filtered by Compensational reset 
		And number of variants should be equal to 0


	Scenario Outline: XL dataset - 2 rows
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And selects the <Reset#1> value for the first row
		And enters <MIN Count#1> in the "Minimal count of events" input
		And HG002 = <Proband#1>, HG003 = <Father#1>, HG004 = <Mother#1>
		And clicks the "Add" button to add new row
		And selects the <Reset#2> value value for the second row
		And enters <MIN Count#2> in the "Minimal count of events" input in the second row
		And HG002 = <Proband#2>, HG003 = <Father#2>, HG004 = <Mother#2> in the second row
		And clicks the "Add" button to apply the filter
		Then "Compound_Request" should be added to the right part of the page
		And variants list should be filtered by Compound_Request 
		And number of variants should be equal to <Variants Number>

		Examples: 
		| <Reset #1>                      | <MIN Count#1> | <Proband#1> | <Father#1> | <Mother#1> | <Reset #2>                      | <MIN Count#2> | <Proband#2> | <Father#2> | <Mother#2> | <Variants Number> |
		| Compensational                  | 1             | 0           | 1-2        | 1-2        | Autosomal Dominant              | 2             | 1-2         | 0          | 4          | 110102            |
		| Homozygous Recessive / X-Linked | 2             | 2           | 0-1        | 0-1        | Compensational                  | 3             | 1           | 0          | 1-2        | 169456            |
		| Autosomal Dominant              | 4             | 1-2         | 0          | 4          | Homozygous Recessive / X-Linked | 1             | 2           | 0-1        | 0-1        | 91777             |

	Scenario: XL dataset - 5 rows
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And selects the "Homozygous Recessive / X-Linked" reset
		And enters "1" in the "Minimal count of events" input
		And clicks "Add" button to add the second row
		And selects the "Autosomal Dominant" reset
		And enters "2" in the "Minimal count of events" input
		And clicks "Add" button to add the third row
		And selects the "Compensational" reset
		And enters "3" in the "Minimal count of events" input
		And clicks "Add" button to add the fouth row
		And selects the "Homozygous Recessive / X-Linked" reset
		And enters "4" in the "Minimal count of events" input
		And clicks "Add" button to add the fifth row
		And selects the "Autosomal Dominant" reset
		And enters "5" in the "Minimal count of events" input
		And clicks the "Add" button to apply the filter
		Then "Compound_Request" should be added to the right part of the page
		And variants list should be filtered by Compound_Request 
		And number of variants should be equal to 115096

	Scenario: XL dataset - impossible to add 6 rows
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And clicks the "Add" button to add the second row
		And clicks the "Add" button to add the third row
		And clicks the "Add" button to add the fouth row
		And clicks the "Add" button to add the fifth row
		And clicks the "Add" button to add the sixth row
		Then the "Add" button should be disabled
		And the sixth row should not be added

	Scenario: XL dataset - Remove row
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And clicks the "Add" button to add the second row
		And clicks the first row
		And clicks the "Remove" button
		Then the first row should be deleted
		And only the secon row should be displayed		

	Scenario: XL dataset - Try to remove last row
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And clicks the first row
		And clicks the "Remove" button
		Then the "Remove" button should be disabled
		And the first row should not be removed

	Scenario: XL dataset - Not only selected
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And clicks the "All" checkbox
		And clicks "Not" checkbox
		Then only the "Not" checkbox should be checked
		And the "All" checkbox should not be checked

	Scenario: XL dataset - Not mode
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And clicks "Not" checkbox
		And selects the "Compensational" reset
		And clicks the "Add" button to apply the filter
		Then "Compound_Request" should be added to the right part of the page
		And variants list should be filtered by Not (Compensational) 
		And number of variants should be equal to 5519862
		
	Scenario: XL dataset - All mode
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And selects the "Compensational" reset
		And clicks the "Add" button to add the second row
		And selects the "Autosomal Dominant" reset
		And clicks the "All" checkbox
		And clicks the "Add" button to apply the filter
		Then "Compound_Request" should be added to the right part of the page
		And variants list should be filtered by All (Compensational, Autosomal Dominant) 
		And number of variants should be equal to 123899

	Scenario: XL dataset - Clear button
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		When the user clicks the "Compound_Request" attribute
		And selects the "Compensational" reset
		And enters "1" in the "Minimal count of events" input
		And clicks the "Add" button
		And the "Compound_Request" filter is applied
		And the user clicks the "Clear" button
		Then the "Compound_Request" filter should be cleared
		And number of variants should be reset to 5628753

	Scenario: XL dataset - Filter after Clear
		Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was open
		And the filter by "Compound_Request" attribute is applied
		When the user clicks the "Clear" button 
		And the filter is cleared
		And the number of variants equal to 5628753
		And the user selects the "Homozygous Recessive / X-Linked" reset
		And clicks the "Add" button to apply the filter
		Then "Compound_Request" should be added to the right part of the page
		And variants list should be filtered by (Homozygous Recessive / X-Linked) 
		And number of variants should be equal to 111977

#	NOT IMPLEMENTED FOR SECONDARY DATASET! NEED TO DISCUSS WITH MICHAEL AND SERGEY!

#	Scenario: WS dataset - "Approx" is available for secondary dataset
#		Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
#		When the user clicks the "Compound_Request" attribute
#		Then the "Approx" dropdown should not be disabled
#		And should be equal to "shared transcripts"
#		And values "shared transcripts", "non-intersecting transcripts", "shared gene" should be present
#
#	Scenario Outline: WS dataset - "shared transcripts"
#		Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
#		When the user clicks the "Compound_Request" attribute
#		And selects the "shared gene" Approx value
#		And selects the <Reset> value
#		And clicks the "Add" button to apply the filter
#		Then "Compound_Request" should be added to the right part of the page
#		And variants list should be filtered by <Reset>
#		And number of variants should be equal to <Variants Number>
#
#		Examples: 
#		| <Reset>                         | <Variants Number> |
#		| Homozygous Recessive / X-Linked | 92                |
#		| Autosomal Dominant              | 30                |
#		| Compensational                  | 121               |
#
#	Scenario Outline: WS dataset - "non-intersecting transcripts"
#		Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
#		When the user clicks the "Compound_Request" attribute
#		And selects the "non-intersecting transcripts" Approx value
#		And selects the <Reset> value
#		And clicks the "Add" button to apply the filter
#		Then "Compound_Request" should be added to the right part of the page
#		And variants list should be filtered by <Reset>
#		And number of variants should be equal to <Variants Number>
#
#		Examples: 
#		| <Reset>                         | <Variants Number> |
#		| Homozygous Recessive / X-Linked | 92                |
#		| Autosomal Dominant              | 30                |
#		| Compensational                  | 121               |
#
#	Scenario Outline: WS dataset - "shared gene"
#		Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was open
#		When the user clicks the "Compound_Request" attribute
#		And selects the "shared transcripts" Approx value
#		And selects the <Reset> value
#		And clicks the "Add" button to apply the filter
#		Then "Compound_Request" should be added to the right part of the page
#		And variants list should be filtered by <Reset>
#		And number of variants should be equal to <Variants Number>
#
#		Examples: 
#		| <Reset>                         | <Variants Number> |
#		| Homozygous Recessive / X-Linked | 92                |
#		| Autosomal Dominant              | 30                |
#		| Compensational                  | 121               |

