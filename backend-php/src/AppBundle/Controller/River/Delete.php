<?php

namespace AppBundle\Controller\River;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\GenericController;
use AppBundle\Entity\River;
use AppBundle\RestApi\River\Delete as RestApiDeleteService;
use Symfony\Component\HttpFoundation\Response;

class Delete extends GenericController
{
    /**
     * @Route("/api/river/{river}")
     * @Method("DELETE")
     */
    public function deleteAction(River $river, RestApiDeleteService $service)
    {
        $service->delete($river);

        return $this->getJsonResponse(
            [],
            Response::HTTP_NO_CONTENT
        );
    }
}
