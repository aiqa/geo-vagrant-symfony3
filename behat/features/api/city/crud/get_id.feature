Feature: Get city record
  As an application user
  I want to get city record

  Scenario: Get city record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/city" with data:
    """
    {
        "name": "{{name}}",
        "population": 4444
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/city"
    And the JSON node "root.name" should be equal to templated value "{{name}}"
    And the JSON node "root.population" should be equal to "4444"
    And I save from the last response JSON node "id" as "cityId"


    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request to "/api/city/{{cityId}}"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/city"
    And the JSON node "root.name" should be equal to templated value "{{name}}"
    And the JSON node "root.population" should be equal to "4444"