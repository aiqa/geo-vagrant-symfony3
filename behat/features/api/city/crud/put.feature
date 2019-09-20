Feature: Update city record
  As an application user
  I want to Update city record

  Scenario: Update city record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/city" with data:
    """
    {
        "name": "{{name}}",
        "population": 2222
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/city"
    And I save from the last response JSON node "id" as "cityId"


    #--------------------------------------------------------------------------------
    # UPDATE
    Given I generate a random string "name2"
    When I send a modified "PUT" request to "/api/city/{{cityId}}" with data:
    """
    {
        "name": "{{name2}}",
        "population": 99999
    }
    """
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/city"
    And the JSON node "root.name" should be equal to templated value "{{name2}}"
    And the JSON node "root.population" should be equal to "99999"


    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request to "/api/city/{{cityId}}"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/city"
    And the JSON node "root.name" should be equal to templated value "{{name2}}"
    And the JSON node "root.population" should be equal to "99999"