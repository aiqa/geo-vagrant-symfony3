Feature: Get list city record
  As an application user
  I want to get list city record

  Scenario: Get list city record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/city" with data:
    """
    {
        "name": "{{name}}",
        "population": 5555
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/city"
    And I save from the last response JSON node "id" as "cityId"

    #--------------------------------------------------------------------------------
    # GET LIST
    When I send a modified "GET" request to "/api/city"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/city_array"
    And the JSON should be valid according to this schema:
    """
      {
          "type": "array",
          "minItems": 1
      }
      """
    And list element with the id "{{cityId}}" has field "name" with value "{{name}}"