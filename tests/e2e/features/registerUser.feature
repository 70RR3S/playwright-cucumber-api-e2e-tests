@sprint1
Feature: register user in the book store app

  As someone interested in Book Store app
  I wanna register my user
  To be able to log in to the app

  @successfulRegistration
  Scenario: Register in the Book Store app with my details
    Given I am on the registration page of the Book Store
    When I enter my details
      | First Name | Last Name  | UserName   | Password   |
      | QA         | Automation | Automation | Testing22* |
    And I mark the recaptcha
    Then I must see an alert with the text "User successfully registered!"