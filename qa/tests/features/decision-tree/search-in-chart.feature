Feature: Decision Tree, Search in charts
	As a user, I want to search by attributes' names in chart

	Background: the Decision Tree Panel was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And the "Hearing_Loss, v.5" decision tree was loaded

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