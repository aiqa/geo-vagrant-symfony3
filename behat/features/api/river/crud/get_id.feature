Feature: Get river record
  As an application user
  I want to get river record

  Scenario: Get river record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/river" with data:
    """
    {
        "name": "{{name}}",
        "length": 4444
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/river"
    And the JSON node "root.name" should be equal to templated value "{{name}}"
    And the JSON node "root.length" should be equal to "4444"
    And I save from the last response JSON node "id" as "riverId"


    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request to "/api/river/{{riverId}}"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/river"
    And the JSON node "root.name" should be equal to templated value "{{name}}"
    And the JSON node "root.length" should be equal to "4444"