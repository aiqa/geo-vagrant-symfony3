<?php

namespace AppBundle\Controller\City;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\GenericController;
use AppBundle\Entity\City;
use AppBundle\RestApi\City\Delete as RestApiDeleteService;
use Symfony\Component\HttpFoundation\Response;

class Delete extends GenericController
{
    /**
     * @Route("/api/city/{city}")
     * @Method("DELETE")
     */
    public function deleteAction(City $city, RestApiDeleteService $service)
    {
        $service->delete($city);

        return $this->getJsonResponse(
            [],
            Response::HTTP_NO_CONTENT
        );
    }
}
