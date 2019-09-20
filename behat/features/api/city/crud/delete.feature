Feature: Delete city record
  As an application user
  I want to delete city record

  Scenario: Delete city record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/city" with data:
    """
    {
        "name": "{{name}}",
        "population": 3333
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/city"
    And I save from the last response JSON node "id" as "cityId"


    #--------------------------------------------------------------------------------
    # DELETE
    When I send a modified "DELETE" request to "/api/city/{{cityId}}"
    Then the response status code should be 204


    #--------------------------------------------------------------------------------
    # DELETE
    When I send a modified "DELETE" request to "/api/city/{{cityId}}"
    Then the response status code should be 404

    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request to "/api/city/{{cityId}}"
    Then the response status code should be 404
