@sprint1
Feature: Create user in Reqres

  As an user of Reqres
  I wanna be able to create mi user
  To I can access the system

  @createUser
  Scenario: Create user in the app Reqres
    Given I am on the registration page and my name is "Automation"
    And I work as an "Automator"
    When I create my user
    Then The response code must be 201
    And I should see my name "Automation" in the response

