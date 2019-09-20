Feature: Delete mountain record
  As an application user
  I want to delete mountain record

  Scenario: Delete mountain record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/mountain" with data:
    """
    {
        "name": "{{name}}",
        "height": 3333
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/mountain"
    And I save from the last response JSON node "id" as "mountainId"


    #--------------------------------------------------------------------------------
    # DELETE
    When I send a modified "DELETE" request to "/api/mountain/{{mountainId}}"
    Then the response status code should be 204


    #--------------------------------------------------------------------------------
    # DELETE
    When I send a modified "DELETE" request to "/api/mountain/{{mountainId}}"
    Then the response status code should be 404

    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request to "/api/mountain/{{mountainId}}"
    Then the response status code should be 404
