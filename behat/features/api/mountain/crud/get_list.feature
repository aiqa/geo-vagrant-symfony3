Feature: Get list mountain record
  As an application user
  I want to get list mountain record

  Scenario: Get list mountain record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/mountain" with data:
    """
    {
        "name": "{{name}}",
        "height": 5555
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/mountain"
    And I save from the last response JSON node "id" as "mountainId"

    #--------------------------------------------------------------------------------
    # GET LIST
    When I send a modified "GET" request to "/api/mountain"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/mountain_array"
    And the JSON should be valid according to this schema:
    """
      {
          "type": "array",
          "minItems": 1
      }
      """
    And list element with the id "{{mountainId}}" has field "name" with value "{{name}}"
