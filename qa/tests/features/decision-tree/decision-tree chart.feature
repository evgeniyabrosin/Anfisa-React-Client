Feature: Decision Tree, Search in charts
	As a user, I want to search by attributes' names in chart

Background: the Decision Tree Panel was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "Hearing_Loss, v.5" decision tree was loaded

Scenario Outline: Search by Valid name
	Given the Decision Trees Panel is opened
	When user inputs "<ValidNameField>" in search field
	Then the field should be filtered

Examples:
	| <ValidNameField> |
	| Callers          |
	| Multiallelic     |
	| SIFT             |


Scenario Outline: Search by Invalid Field
	Given the Decision Trees Panel is opened
	When user inputs "<InvalidNameField>" in search field
	Then the field should be filtered

Examples:

	| <ValidNameField> |
	| rECallers        |
	| 1Multiallelic    |
	| _SIFT            |




Scenario Outline: Search by attribute's name (full)
	When the user enters the <Attribute Name> to the Search field in the chart
	Then the chart should be filtered by <Attribute Name>
	And only chart for <Attribute Name> should be displayed

Examples:
	| Attribute Name |
	| gnomAD_AF      |
	| Clinvar_Benign |
	| Callers        |

Scenario Outline: Search by attribute's name (substring)
	When the user enters the <Attribute Substr> to the Search field in the chart
	Then the chart should be filtered by <Attribute Substr>
	And only charts with <Attribute Substr> should be displayed

Examples:
	| Attribute Substr | Attribute Name |
	| omAD             | gnomAD_AF      |
	| invar            | Clinvar_Benign |
	| all              | Callers        |

Scenario Outline: Search by attribute's name (upper-case)
	When the user enters the <Attribute Upper> to the Search field in the chart
	Then the chart should be filtered by <Attribute Name>
	And only charts with <Attribute Name> should be displayed

Examples:
	| Attribute Upper | Attribute Name |
	| GNOMAD_AF       | gnomAD_AF      |
	| CLINVAR_BENIGN  | Clinvar_Benign |
	| CALLERS         | Callers        |

Scenario Outline: Search by attribute's name (lower-case)
	When the user enters the <Attribute Lower> to the Search field in the chart
	Then the chart should be filtered by <Attribute Name>
	And only charts with <Attribute Name> should be displayed

Examples:
	| Attribute Lower | Attribute Name |
	| qd              | QD             |
	| fs              | FS             |


Scenario Outline: Search by not added attribute
	When the user enters the <Attribute Name> to the Search field in the chart
	Then the chart should be filtered by <Attribute Name>
	And only charts with <Attribute Name> should be displayed

Examples:
	| Attribute Name          |
	| Custom_Inheritance_Mode |
	| GeneRegion              |

Scenario Outline: Add few fields with Join by AND by using "+" button
	Given the Decision Trees Panel is opened
	When user click the button "+" with "<NameField1>"
	And user adds "<NameFilter1>"
	And the filter "<NameFilter2>" is added
	And user click the button "+" with "<NameField2>"
	And user adds "<NameFilter2>"
	And user clicks button Add by Join
	And user  selects Join by AND
	Then the filters should be added

Examples:

	| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

Scenario Outline: Add few fields with Join by OR
	Given the Decision Trees Panel is opened
	When user click the button "+" with "<NameField1>"
	And user adds "<NameFilter1>"
	When the filter "<NameFilter1>" is added
	And user clicks Add attribute
	And user click the button "+" with "<NameField2>"
	And user adds "<NameFilter2>"
	And user clicks button Add by Join
	And user selects Join by OR
	Then the filters should be added

Examples:


	| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

Scenario Outline: replace filters
	Given the Decision Trees Panel is opened
	When user click the button "+" with "<NameField1>"
	And user adds "<NameFilter1>"
	When the filter "<NameFilter1>" is added
	And user clicks Add attribute
	And user click the button "+" with "<NameField2>"
	And user adds "<NameFilter2>"
	And user selects replace
	Then the filters should be replaced

Examples:
	| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

Scenario Outline: Add second step with filter
	Given the Decision Trees Panel is opened
	When user click the button "+" with "<NameField1>"
	And user adds "<NameFilter1>"
	And user clicks <"+" add step>
	And user click the button "+" with "<NameField2>"
	And user adds "<NameFilter2>"
	Then the second step with filter should be added

Examples:
	| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

Scenario Outline: the button Select ALL
	Given the Decision Trees Panel is opened
	When user click the button "+" with "<NameField>"
	And user Clicks the button Select All
	Then ALL filters should be added

Examples:
	| <NameField>   |
	| Callers       |
	| Has_Variant   |
	| Variant_Class |

Scenario Outline: The button Clear all
	Given the Decision Trees Panel is opened
	When user click the button "+" with "<NameField>"
	And user adds "<NameFilter1>" and "<NameFilter2>"
	And user clicks the Clear All Button
	Then the filters should be cleared

Examples:
	| <NameField>   | <NameFilter1>    | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | BGM_CMPD_HET     |
	| Has_Variant   | father [NA24149] | mother [NA24143] |
	| Variant_Class | deletion         | SNV              |
