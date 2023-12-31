@sprint2
Feature: log in to the Book Store app

  As a Book Store app user
  I want to log in with my username and password
  To see the list of available books

  @successfullyLogin
  Scenario: Log in with my credentials
    Given I am on the login page of the Book Store
    When enter my credentials
      | user       | password   |
      | Automation | Testing22* |
    Then I must see my user "automation" in the home of the Book Store
