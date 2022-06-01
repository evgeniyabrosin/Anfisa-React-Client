Feature: Filter Refiner, Search field
  As the Anfisa user I want to have opportunity to search by attribute names.
  Search DOES NOT work by group name (like Inheritance, Genes) and SHOULD NOT.
  Search DOES NOT work by attribute value (like Callers -> GATK_DE_NOVO) and SHOULD NOT.

	Scenario Outline: Search attribute name by existed value
		Given the Main Table was opened
		When user clicks Edit Filters
		And user inputs <ValidNameField> in the search field
		Then the attributes should be filtered

		Examples:
		| <ValidNameField> |
		| Rules            |
		| Symbols          |
		| SIFT             |


	Scenario Outline: Search attribute name by substring

		Given the Main Table was opened
		When user clicks Edit Filters
		And user inputs the part of "<Attr_Substring>" in the search field
		Then the fields should be filtered

		Examples:
		| <Attr_Substring> | <Attribute Name>          |
		| all              | Callers                   |
		| und_H            | Compound_Het              |
		| criteria         | Clinvar_criteria_provided |

	Scenario Outline: Search attribute name by upper-case
		Given the Main table was opened
		When user clicks Edit Filters
		And enters "<AttrInUpperCase>" in upper-case in the search field
		Then the attributes should be filtered

		Examples:
		| <AttrInUpperCase>       | <Attribute Name>             |
		| MOST_SEVERE_CONSEQUENCE | Most_Severe_Consequence |
		| POLYPHEN_2_HVAR         | Polyphen_2_HVAR         |
		| DISEASES                | Diseases                |

	Scenario Outline: Search attribute name by non-existed value
		Given the Main table was opened
		When user clicks Edit Filters
		And enters <InvalidNameField> in the search field
		Then the fields should be filtered

		Examples:
		| <InvalidNameField> |
		| !Rules             |
		| Rules_             |
		| Ru.les             |
		| Rulles             |