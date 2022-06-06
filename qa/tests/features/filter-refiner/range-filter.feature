Feature: Filter Refiner, Filter by range attribute
	As a user, I want to work with numeric attributes, filter by their values, ranges.
	We assume, that all attributes with ranges have the same behavior.

Scenario Outline: 01 Filter by range, middle - XL dataset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
	When user clicks the <Attribute Name>
	And enters the minimum value of range <Minimum Value>
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range <Maximum Value>
	And clicks the "+ Add Attribute" button to apply the filter
	Then filter should be applied
	And the range <Minimum Value> <= <Attribute Name> <= <Maximum Value> should be displayed in the right part of the screen
	And number of variants should be equal to <Variants Number>
	And the "View Variants" dialog can be opened
	And the "Full List" view should be disabled

Examples:
	| <Attribute Name>             | <Minimum Value> | <Maximum Value> | <Total variants> |
	| Num_Samples                  | 1               | 2               | 3281689          |
	| Num_Genes                    | 5               | 10              | 652              |
	| Start_Pos                    | 25200           | 255200          | 5524             |
	| gnomAD_PopMax_AN             | 20              | 100             | 4632             |
	| Number_submitters            | 2               | 16              | 5165             |
	| Min_GQ                       | 0               | 750             | 5591394          |
	| Number_of_clinvar_submitters | 2               | 22              | 5418             |
	| Severity                     | 1               | 2               | 52248            |

Scenario Outline: 02 Filter by range, boundary values - XL dataset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
	When user clicks the <Attribute Name>
	And enters the minimum value of range <Minimum Value>
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range <Maximum Value>
	And clicks the "+ Add Attribute" button to apply the filter
	Then filter should be applied
	And the range <Minimum Value> <= <Attribute Name> <= <Maximum Value> should be displayed in the right part of the screen
	And number of variants should be equal to <Variants Number>
	And the "View Variants" dialog can be opened
	And the "Full List" view should be disabled

Examples:
	| <Attribute Name>             | <Minimum Value> | <Maximum Value> | <Total variants> |
	| Num_Samples                  | 0               | 3               | 5628753          |
	| Num_Genes                    | 0               | 23              | 5628753          |
	| Start_Pos                    | 25165           | 248930384       | 5628753          |
	| gnomAD_PopMax_AN             | 0               | 249160          | 5628753          |
	| Number_submitters            | 0               | 30              | 5628753          |
	| Min_GQ                       | -1              | 840             | 5628753          |
	| Number_of_clinvar_submitters | 0               | 30              | 5628753          |
	| Severity                     | -1              | 3               | 5628753          |

Scenario Outline: 03 Filter by two ranges, XL dataset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
	When user clicks the <Attribute Name#1>
	And enters the minimum value of range <MIN #1>
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range <MAX #1>
	And clicks the "+ Add Attribute" button to apply the filter
	And clicks the <Attribute Name#2>
	And enters the minimum value of range <MIN #2>
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range <MAX #2>
	And clicks the "+ Add Attribute" button to apply the filter
	Then both filters should be applied
	And the range <MIN #1> <= <Attribute Name#1> <= <MAX #1> should be displayed in the right part of the screen
	And the range <MIN #2> <= <Attribute Name#2> <= <MAX #2> should be displayed in the right part of the screen
	And the variants number should be equal to <Variants Number>
	And the "View Variants" dialog can be opened
	And the "Full List" view should be disabled

Examples:
	| <Attribute Name#1> | <MIN #1> | <MAX #1> | <Attribute Name#2> | <MIN #2> | <MAX #2> | <Variants Number> |
	| Severity           | -1       | 0        | Proband_GQ         | 100      | 200      | 35994             |


Scenario Outline: 04 Filter by range with invalid values (Minimum value < MIN)
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
	When user clicks the <Attribute Name>
	And enters the minimum value of range <Minimum Value>
	And enters the maximum value of range <Maximum Value>
	And clicks the "+ Add Attribute" button to apply the filter
	Then the "+ Add Attribute" button should be disabled
	And the filter should not be applied
	And the validation message should be displayed

Examples:
	| <Filter name>                | <Minimum value> | <Maximum value> |
	| Num_Samples                  | -1              | 3               |
	| Num_Genes                    | -1              | 23              |
	| Start_Pos                    | 0               | 248930384       |
	| gnomAD_PopMax_AN             | -1              | 249160          |
	| Number_submitters            | -1              | 30              |
	| Min_GQ                       | -2              | 840             |
	| Number_of_clinvar_submitters | -1              | 30              |
	| Severity                     | -2              | 3               |

Scenario Outline: 05 Filter by range with invalid values (Maximum value > MAX)
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
	When user clicks the <Attribute Name>
	And enters the minimum value of range <Minimum Value>
	And enters the maximum value of range <Maximum Value>
	And clicks the "+ Add Attribute" button to apply the filter
	Then the "+ Add Attribute" button should be disabled
	And the filter should not be applied
	And the validation message should be displayed

Examples:
	| <Attribute Name>             | <Minimum Value> | <Maximum Value> |
	| Num_Samples                  | 0               | 4               |
	| Num_Genes                    | 0               | 24              |
	| Start_Pos                    | 25165           | 248930385       |
	| gnomAD_PopMax_AN             | 0               | 249161          |
	| Number_submitters            | 0               | 31              |
	| Min_GQ                       | -1              | 841             |
	| Number_of_clinvar_submitters | 0               | 31              |
	| Severity                     | -1              | 4               |

Scenario Outline: 06 Filter by range with invalid values (strings)
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
	When user clicks the <Attribute Name>
	And enters the minimum value of range <Minimum Value>
	And enters the maximum value of range <Maximum Value>
	And clicks the "+ Add Attribute" button to apply the filter
	Then values should not be written
	And the "+ Add Attribute" button should be disabled
	And the filter should not be applied

Examples:
	| <Attribute Name> | <Minimum Value> | <Maximum Value> |
	| Num_Samples      | qwerty          | !@#$%^&         |
	| Num_Genes        | !@#$%^&         | qwerty          |
	| Start_Pos        | 1 2 3           | {}:"<>          |

Scenario Outline: 07 Clear button
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
	When user clicks the <Attribute Name>
	And enters the minimum value of range <Minimum Value>
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range <Maximum Value>
	And clicks the "+ Add Attribute" button to apply the filter
	And the filter is applied
	And the user clicks the "Clear" button
	Then the filter should be cleared

Examples:
	| <Attribute Name> | <Minimum Value> | <Maximum Value> | <Total variants> |
	| Num_Samples      | 1               | 2               | 3281689          |
