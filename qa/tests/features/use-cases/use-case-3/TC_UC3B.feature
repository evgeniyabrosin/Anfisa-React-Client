
Scenario Outline: Open the Dataset info

Given the "Dataset list" was opened
When the user clicks the "xl_PGP3140_wgs_NIST-4_2" dataset at the left part of the page
Then the information of the XL-dataset (the "Dataset info" page) should be opened at the right part of the page

The information of the "xl PF0005_WES" Dataset (the "Dataset info" page) is opened at the right part of the page    

Scenario Outline: Open Decision Tree Panel

Given "xl_PGP3140_wgs_NIST-4_2" XL Dataset info was opened
When the user clicks the "Open in viewer" dropdown menu at the middle part of the page
and clicks the "Decision Tree Panel" option in the dropdown menu
Then Decision Tree Panel should be opened
and the total number of variants in the dataset shown at the top right corner as well as under "Results" should equal 5,628,753
and the value format is "5,628,753" (not "5628753")

Scenario Outline: Add "Min_GQ" attribute

Given The "Decision Tree Panel referred to the xl PF0005_WES dataset was opened
When the user clicks "Add attribute" on Step 1
and types "min" in the Search field to find the section needed
and clicks "Min_GQ"
and types "20" in the field referred to the maximum value
and changes greater-than-or-equal-to sign for greater-than sign by clicking at an arrow button
and clicks "Add attribute"
and clicks the "Exclude" radio button
Then the attribute should be added to Step 1
and 37,122 variants should be excluded from future filtration (the "-37,122" value in this particular format should appear near the purple minus referred to Step 1)

Scenario Outline: Add "FS" attribute

Given The Decision Tree Panel referred to the xl PF0005_WES dataset was opened
When the user clicks "Add Step"
and types "FS" in the Search field to find the section needed
and clicks "FS"
and types "30" in the field referred to the minimum value
and clicks "Add attribute"
Then the attribute should be added to Step 1
and 0 variants should be excluded from the derived dataset (the "-0" value in this particular format should appear near the purple minus referred to Step 1)    

The attribute should be added to Step 1.
1,114,914 variants should be included in the derived dataset (the "1,114,914" value in this particular format should appear near the green plus referred to Step 1)