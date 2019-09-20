Feature: Delete river record
  As an application user
  I want to delete river record

  Scenario: Delete river record

    #--------------------------------------------------------------------------------
    # CREATE
    Given I generate a random string "name"
    When I send a modified "POST" request to "/api/river" with data:
    """
    {
        "name": "{{name}}",
        "length": 3333
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be valid according to schema "response/river"
    And I save from the last response JSON node "id" as "riverId"


    #--------------------------------------------------------------------------------
    # DELETE
    When I send a modified "DELETE" request to "/api/river/{{riverId}}"
    Then the response status code should be 204


    #--------------------------------------------------------------------------------
    # DELETE
    When I send a modified "DELETE" request to "/api/river/{{riverId}}"
    Then the response status code should be 404

    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request to "/api/river/{{riverId}}"
    Then the response status code should be 404
