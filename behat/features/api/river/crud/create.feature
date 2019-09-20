Feature: Create river record
  As an application user
  I want to create river record

  Scenario: Create river record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/river" with data:
    """
    {
        "name": "{{name}}",
        "length": 1111
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/river"
    And the JSON node "root.name" should be equal to templated value "{{name}}"
    And the JSON node "root.length" should be equal to "1111"
