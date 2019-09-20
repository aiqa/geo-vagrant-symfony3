Feature: Create mountain record
  As an application user
  I want to create mountain record

  Scenario: Create mountain record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/mountain" with data:
    """
    {
        "name": "{{name}}",
        "height": 1111
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/mountain"
    And the JSON node "root.name" should be equal to templated value "{{name}}"
    And the JSON node "root.height" should be equal to "1111"