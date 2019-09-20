Feature: Update mountain record
  As an application user
  I want to Update mountain record

  Scenario: Update mountain record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/mountain" with data:
    """
    {
        "name": "{{name}}",
        "height": 2222
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/mountain"
    And I save from the last response JSON node "id" as "mountainId"


    #--------------------------------------------------------------------------------
    # UPDATE
    Given I generate a random string "name2"
    When I send a modified "PUT" request to "/api/mountain/{{mountainId}}" with data:
    """
    {
        "name": "{{name2}}",
        "height": 99999
    }
    """
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/mountain"
    And the JSON node "root.name" should be equal to templated value "{{name2}}"
    And the JSON node "root.height" should be equal to "99999"


    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request to "/api/mountain/{{mountainId}}"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be valid according to schema "response/mountain"
    And the JSON node "root.name" should be equal to templated value "{{name2}}"
    And the JSON node "root.height" should be equal to "99999"