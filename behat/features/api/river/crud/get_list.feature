Feature: Get list river record
  As an application user
  I want to get list river record

  Scenario: Get list river record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/river" with data:
    """
    {
        "name": "{{name}}",
        "length": 5555
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/river"
    And I save from the last response JSON node "id" as "riverId"

    #--------------------------------------------------------------------------------
    # GET LIST
    When I send a modified "GET" request to "/api/river"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/river_array"
    And the JSON should be valid according to this schema:
    """
      {
          "type": "array",
          "minItems": 1
      }
      """
    And list element with the id "{{riverId}}" has field "name" with value "{{name}}"
