Feature: Decision Tree, List-value attributes
	As a user, I want to add list-values attributes in the tree, check variants and see charts

	Scenario Outline: Open a List-value attribute dialog
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attribute Name> attribute
		Then the <Attribute Name> attribute dialog should be open
		And the dialog should contain list of values
		And the Search field <Search Is Present>
		And the Pagination <Pagination is Present>

		Examples: 
		| <Attribute Name> | <Search Is Present>   | <Pagination is Present> |
		| Callers          | Should Not Be Present | Should Not Be Present   |
		| Symbol           | Should Be Present     | Should Be Present       |
	
	Scenario Outline: Search by attribute's value (full)
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attribute Name> attribute
		And the Search fiels is present
		And the user enters <Attribute Value Full> in the Search field
		Then the corresponding value should be found

		Examples: 
		| <Attribute Name>     | <Attribute Value Full> |
		| Symbol               | ZHX2                   |
		| PMIDs                | 12399075               |
		| ClinVar_Significance | Likely benign, other   |

	Scenario Outline: Search by attribute's name (substring)
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attribute Name> attribute
		And the Search fiels is present
		And the user enters <Attribute Value Substr> in the Search field
		Then the <Attribute Value> should be found

		Examples: 
		| <Attribute Name>     | <Attribute Value> | <Attribute Value Substr> |
		| Symbol               | AKR1C3            | R1C3                     |
		| PMIDs                | 21103356          | 3356                     |
		| ClinVar_Significance | not provided      | prov                     |

	Scenario Outline: Search by attribute's name (upper-case)
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attribute Name> attribute
		And the Search fiels is present
		And the user enters <Attribute Value Upper> in the Search field
		Then the <Attribute Value> should be found

		Examples: 
		| <Attribute Name>     | <Attribute Value> | <Attribute Value Upper> |
		| Mostly_Expressed_in  | Prostate          | PROSTATE                |
		| ClinVar_Significance | not provided      | NOT PROVIDED            |

	Scenario Outline: Search by attribute's name (lower-case)
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attribute Name> attribute
		And the Search fiels is present
		And the user enters <Attribute Value Lower> in the Search field
		Then the <Attribute Value> should be found

		Examples: 
		| <Attribute Name> | <Attribute Value> | <Attribute Value Lower> |
		| Symbol           | AAAS              | aaas                    |
		| Chemicals        | ABT-751           | abt-751                 |

	Scenario Outline: Search by attribute's name (special characters)
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attribute Name> attribute
		And the Search fiels is present
		And the user enters <Attribute Value Lower> in the Search field
		Then the corresponding value should be found

		Examples: 
		| <Attribute Name>   | <Attribute Value With Chars>                                                              |
		| Symbol             | ZHX1-C8orf76                                                                              |
		| Chemicals          | (S)-EDDP                                                                                  |
		| ClinVar_Submitters | CHEO Genetics Diagnostic Laboratory,Children's Hospital of Eastern Ontario: Likely benign |

	Scenario Outline: Pagination, Next page
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attribute Name> attribute
		And the Pagination is present
		And the user clicks the "Next Page" button
		Then the second page should be open

		Examples: 
		| <Attribute Name> |
		| Symbol           |
		| Chemicals        |
		| PMIDs            |

	Scenario Outline: Pagination, Previous page
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the <Attribute Name> dialog is open
		And not first page is displayed
		When the user clicks the "Previous Page" button
		Then the previous page should be open

		Examples: 
		| <Attribute Name> |
		| Symbol           |
		| Chemicals        |
		| PMIDs            |

	Scenario Outline: Search + Pagination
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attribute Name> attribute
		And the <Attribute Name> dialog is open
		And the user clicks the "Next Page" button
		And the second page is open
		And the user enters a <Attribute Value Substr> in the Search fiels
		Then the values list should be filtered by <Attribute Value Substr>
		And the first page should be open automatically

		Examples: 
		| <Attribute Name> | <Attribute value Substr> |
		| Symbol           | 233                      |
		| Chemicals        | abin                     |

	Scenario Outline: Cancel adding of an attribute
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attribute Name> attribute
		And the <Attribute Name> dialog is open
		And the user clicks the <Attribute Value>
		And clicks the "Cancel" button
		Then the "Add Attribute" dialog should be closed
		And the <Attribute Name> with <Attribute Value> should not be added to the first step

		Examples: 
		| <Attribute Name> | <Attribute Value>            |
		| Callers          | INHERITED_FROM: Both parents |
		| Chemicals        | dronabinol                   |

	Scenario Outline: full test - examples
		Given the Decision Tree page was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
		When the user clicks the "Add Attribute" in the first step
		And clicks the <Attr #1>
		And clicks the <Attr#1 Val#1>
		And clicks the "Add attribute button"
		And the attribute is added to the first step
		And the user clicks the menu of the first step
		And clicks the "Add Step Before"
		And new first step is added
		And the user clicks the "Add attribute" button on the new first step
		And the "Add attribute" dialog is open
		And the user clicks <Attr #2>
		And clicks <Attr#2 Val#1> and <Attr#2 Val#2>
		And clicks the "Add attribute button"
		And attribute with two values is added to the new first step
		And the user clicks the menu button of the second step
		And clicks the "Add Step After" button
		And the third step is added
		And the user clicks the "Add attribute" button on the third step
		And the "Add attribute" dialog is open
		And the user clicks the <Attr #3>
		And clicks the <Attr#3 Val#1>
		And clicks the "Add attribute" button
		And the attribute is added to the third step
		And the user clicks the "Add attribute" button on the third step again
		And the "Add attribute" dialog is open
		And the user clicks the <Attr #4>
		And clicks the <Attr#4 Val#1>
		And clicks the "Add by joining" button
		And clicks "Join by AND" button
		And the <Attr#4 Val#1> is added to the third step via Join AND
		And the user clicks the "Add attribute" button on the third step again
		And the "Add attribute" dialog is open
		And the user clicks the <Attr #5>
		And clicks the <Attr#5 Val#1>
		And clicks the "Add by joining" button
		And clicks "Join by OR" button
		And the <Attr#5 Val#1> is added to the third step via Join OR
		And the user clicks the user clicks the "Add attribute" button on the second step
		And clicks the <Attr Replace>
		And the "Add attribute" dialog is open
		And the user clicks the <Replace Value>
		And clicks the "Replace" button
		And <Attr#2 Val#1> is replaced to <Replace Value>
		And the user clicks the menu button on the third step
		And clicks the "Negate" button
		And all attributes in the third step are negated
		And the user clicks the "Negate" checkbox near <Attr#4 Val#1> of the third step
		And the attribute value is negated
		And the user clicks the menu of the first step
		And clicks the "Duplicate" button
		And the first step is duplicated
		And the user clicks menu of the first step
		And clicks the "Delete" button
		And the first step is removed
		And the user clicks the "Edit" (gear) button on the attribute of the second step
		And clicks <Attr#1 Val#2> 
		And clicks the "Save attribute" button
		And the user clicks the "Edit" (gear) button on the <Attr#5 Val#1> of the third step
		And the clicks the "Delete" button
		And the attribute is removed
		And the user clicks the "Exclude" radio-button on the first step
		And clicks the "Include" button on the Final step
		Then Number of variants in the first step should be equal to <First Number>
		And <To Sec> number of variants should go to the second step
		And Number of variants in the second step should be equal to <Second Number>
		And <To Third> number of variants should go to the third step
		And Number of variants in the third step should be equal to <Third Number>
		And Number of variants in the Final step should be equal to <Final Number>



		Examples: 
		| <Attr #1>            | <Attr#1 Val#1>               | <Attr #2>                    | <Attr#2 Val#1>              | <Attr#2 Val#2>           | <Attr #3>           | <Attr#3 Val#1>         | <Attr #4>                   | <Attr#4 Val#1>    | <Attr #5>               | <Attr#5 Val#1>        | <Attr Replace> | <Replace Value> | <Attr#1 Val#2> | <First Number> | <To Sec> | <Second Number> | <To Third> | <Third Number> | <Final Number> |
		| Callers              | INHERITED_FROM: Both parents | Variant_Class                | deletion                    | insertion                | Region_Canonical    | exon                   | Canonical_Annotation        | inframe_insertion | Multiallelic            | True                  |                |                 |                |                |          |                 |            |                |                |
		| Variant_Class        | substitution                 | Callers                      | GATK_HOMO_REC               | GATK_DE_NOVO             | Mostly_Expressed_in | Artery - Tibial        | Region_Worst                | downstream        | Has_Variant             | mother [HG004]        |                |                 |                |                |          |                 |            |                |                |
		| Chromosome           | chr14                        | Clinvar_stars                | 1                           | 2                        | Region_Worst        | masked_repeats         | HGMD_Benign                 | VUS or Pathogenic | Presence_in_Databases   | GeneDx                |                |                 |                |                |          |                 |            |                |                |
		| PMIDs                | 16574953                     | Proband_Zygosity             | Heterozygous                | Homozygous               | Callers             | INHERITED_FROM: Mother | In_hg19                     | Mapped            | Clinvar_acmg_guidelines | ACMG2016              |                |                 |                |                |          |                 |            |                |                |
		| ClinVar_Significance | Benign                       | Diseases                     | Inflammatory Bowel Diseases | Opioid-Related Disorders | FATHMM              | D                      | ClinVar_Significance_GeneDx | likely benign     | Clinvar_review_status   | no assertion provided |                |                 |                |                |          |                 |            |                |                |
		| Diseases             | Alcoholism                   | SIFT                         | tolerated                   | tolerated_low_confidence | splice_altering     | unlikely               | Region_Canonical            | intron            | Symbol                  | A4GALT                |                |                 |                |                |          |                 |            |                |                |
		| Mostly_Expressed_in  | Bladder                      | ClinVar_Significance_Invitae | likely benign               | benign                   | Panels              | Autism_Spectrum        | Variant_Class               | substitution      | Callers                 | GATK_HOMOZYGOUS       |                |                 |                |                |          |                 |            |                |                |