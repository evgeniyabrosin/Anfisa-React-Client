Feature: Main table, Concatenation of Zone filters
        As the Anfisa user I want to filter variants list by Gene, Gene List, Sample, and Tag simultaneously

        Given The "Main table" of the WS dataset was open
        When  User clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And user clicks one gene
        And clicks the "Add" button under the "Gene list" section
        And the "Gene list" dialog is opened
        And user clicks one gene list
        Then Variants list should be filtered be selected gene and gene list
        ​
        Given The "Main table" of the WS dataset was open
        When  User clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And user clicks one gene
        And clicks the "Add" button under the "Sample" section
        And the "Sample" dialog is opened
        And user clicks one sample
        Then Variants list should be filtered be selected gene and sample
        ​
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And user clicks one gene
        And clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And user clicks one tag
        Then Variants list should be filtered be selected gene and tag
        ​
        Given The "Main table" of the WS dataset was open
        When user clicks the "Add" button under the "Gene list" section
        And the "Gene list" dialog is opened
        And User clicks one gene list
        And user clicks the "Add" button under the "Sample" section
        And the "Sample" dialog is opened
        And  user clicks one sample
        Then Variants list should be filtered be selected gene list and sample
        ​
        ​
        Given The "Main table" of the WS dataset was open
        When  user clicks the "Add" button under the "Gene list" section
        And the "Gene list" dialog is opened
        And User clicks one gene list
        And clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And user clicks one tag
        Then Variants list should be filtered be selected gene list and tag
        ​
        ​
        Given The "Main table" of the WS dataset was open
        When  User clicks the "Add" button under the "Sample" section
        And the "Sample" dialog is opened
        And user clicks one sample
        And clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And user clicks one tag
        Then Variants list should be filtered be selected sample and tag
        ​
        ​
        Given The "Main table" of the WS dataset was open
        When User clicks the "Add" button under the "Gene" section
        And the "Gene" dialog is opened
        And user clicks one gene
        And clicks the "Add" button under the "Gene list" section
        And the "Gene list" dialog is opened
        And user clicks one gene list
        And clicks the "Add" button under the "Sample" section
        And the "Sample" dialog is opened
        And user clicks one sample
        And clicks the "Add" button under the "Tag" section
        And the "Tag" dialog is opened
        And user clicks one tag
        And clicks "Not mode"
        And clicks "Variants with notes only"
        Then Variants list with notes and without selected tag should be filtered be selected gene, gene list, and samples