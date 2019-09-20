Feature: Update river record
  As an application user
  I want to Update river record

  Scenario: Update river record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/river" with data:
    """
    {
        "name": "{{name}}",
        "length": 2222
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/river"
    And I save from the last response JSON node "id" as "riverId"


    #--------------------------------------------------------------------------------
    # UPDATE
    Given I generate a random string "name2"
    When I send a modified "PUT" request to "/api/river/{{riverId}}" with data:
    """
    {
        "name": "{{name2}}",
        "length": 99999
    }
    """
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/river"
    And the JSON node "root.name" should be equal to templated value "{{name2}}"
    And the JSON node "root.length" should be equal to "99999"


    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request to "/api/river/{{riverId}}"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/river"
    And the JSON node "root.name" should be equal to templated value "{{name2}}"
    And the JSON node "root.length" should be equal to "99999"
